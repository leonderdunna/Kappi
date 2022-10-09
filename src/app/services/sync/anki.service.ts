import {Injectable} from '@angular/core';
import {Card} from "../../objekte/card/card.model";
import {CardsService} from "../cards.service";

@Injectable({
  providedIn: 'root'
})
export class AnkiService {

  constructor(private cardsService: CardsService) {

  }

  private invoke(action: string, version: number, params: any = {}) {
    return new Promise((resolve, reject) => {
      const xhr = new XMLHttpRequest();
      xhr.addEventListener('error', () => reject('failed to issue request'));
      xhr.addEventListener('load', () => {
        try {

          const response = JSON.parse(xhr.responseText);

          if (Object.getOwnPropertyNames(response).length != 2) {
            throw 'response has an unexpected number of fields';
          }
          if (!response.hasOwnProperty('error')) {
            throw 'response is missing required error field';
          }
          if (!response.hasOwnProperty('result')) {
            throw 'response is missing required result field';
          }
          if (response.error) {
            throw response.error;
          }
          resolve(response.result);
        } catch (e) {
          reject(e);
        }
      });

      xhr.open('POST', 'http://127.0.0.1:8765');
      xhr.send(JSON.stringify({action, version, params}));
    });
  }

  addDeck(name: string) {
    this.invoke('createDeck', 6, {deck: 'Kappi::' + name})
  }

  /**
   * @Description: Löscht die entsprechende Karte aus Anki. sollte nicht verwendet werden. (deleteByAnkiID ist sehr viel performanter)
   * @param id
   */
  async deleteByKappiID(id: string) {
    let ankiCards = await this.getAllCards();
    // @ts-ignore
    for (let ankiCard of ankiCards) {
      if (ankiCard.fields["Kappi ID"].value == id) {
        console.log(id, ankiCard, "in 'deletebykappiid'")
        await this.invoke(
          "deleteNotes",
          6,
          {
            "notes": [ankiCard.noteId]
          })
      }

    }
  }

  async deleteByAnkiID(id: string | string[], deleteMultiple: boolean = false) {
    await this.invoke(
      "deleteNotes",
      6,
      {
        "notes": deleteMultiple ? id : [+id]
      })
  }

  async getAllCards(): Promise<any[]> {
    let cardIDs = await this.invoke(
      "findCards",
      6,
      {
        "query": "deck:Kappi"
      }
    )
    let noteIDs = await this.invoke(
      "cardsToNotes",
      6,
      {
        "cards": cardIDs

      })


    let cards = await this.invoke(
      "notesInfo",
      6,
      {
        "notes": noteIDs
      }
    )


// @ts-ignore
    return cards;
  }

  async updateKappiCardByAnkiID(id: string) {
    let ankiCard = await this.invoke(
      "notesInfo",
      6,
      {
        "notes": [+id]
      }
    )

    // @ts-ignore
    let card = this.cardsService.getCard(ankiCard[0].fields["Kappi ID"].value)

    // @ts-ignore
    card.content[card.content.length - 1].felder.frage = ankiCard[0].fields["Frage"].value;
    // @ts-ignore
    card.content[card.content.length - 1].felder.antwort = ankiCard[0].fields["Antwort"].value;
    card.content[card.content.length - 1].time = Date.now();

    this.cardsService.updateCardContent(card.content[card.content.length - 1], card.id)
  }

  async updateAnkiCardByAnkiID(id: string) {
    let ankiCard = await this.invoke(
      "notesInfo",
      6,
      {
        "notes": [+id]
      }
    )
    // @ts-ignore

    let card = this.cardsService.getCard(ankiCard[0].fields["Kappi ID"].value)

    await this.invoke(
      "updateNoteFields",
      6,
      {
        "note": {
          "id": +id,
          "fields": {
            "Kappi ID": card.id,
            "Kappi Time": card.content[card.content.length - 1].time + "",
            "Frage": card.content[card.content.length - 1].felder.frage,
            "Antwort": card.content[card.content.length - 1].felder.antwort,
          }
        }
      })

    //TODO
  }


  //TODO:
  async scan(): Promise<{
    kartenInAnki: number,
    kartenInKappi: number,
    kartenFehlenInAnki: { kappiId: string }[],
    newerInKappi: { kappiId: string, ankiId: string }[],
    newerInAnki: { kappiId: string, ankiId: string }[],
    gelöscht: { ankiId: string }[], conflicts: any[],
    kartenFehlenInKappi: { ankiId: string, frage:string,antwort:string, paket:string }[],
  }> {
    let ankiCards = await this.getAllCards();
    let cards = this.cardsService.getCards();
    console.log(cards, ankiCards, "in 'scan' anfang")

    let newerInKappi: { kappiId: string, ankiId: string }[] = [];
    let kartenFehlenInAnki: { kappiId: string }[] = [];
    let gelöscht: { ankiId: string }[] = [];
    let conflicts: any[] = [];
    let newerInAnki: { kappiId: string, ankiId: string }[] = [];
    let kartenFehlenInKappi: { ankiId: string,frage:string,antwort:string,paket:string }[] = [];

    for (let card of cards) {
      if (!(await this.isInAnki(card))) {
        kartenFehlenInAnki.push({kappiId: card.id})
        continue;
      }
      for (let ankiCard of ankiCards) {

        if (card.id == ankiCard.fields["Kappi ID"].value) {
          if (card.content[card.content.length - 1].time > ankiCard.fields["Kappi Time"].value - 0) {
            newerInKappi.push({kappiId: card.id, ankiId: ankiCard.noteId})

          }
        }
      }


    }
    for (let ankiCard of ankiCards) {

      let remove = true;
      for (let card of cards) {
        console.log(card.id, ankiCard.fields["Kappi ID"].value, "in 'scan' for")
        if (ankiCard.fields["Kappi ID"].value == card.id || ankiCard.fields["Kappi ID"].value == "") {
          remove = false
        }
      }
      if (remove) {
        console.log(ankiCard, cards, "in 'scan' to remove")
        gelöscht.push({ankiId: ankiCard.noteId})

      }

      //Search updates in Anki
      let id = ankiCard.fields["Kappi ID"].value;
      let card = this.cardsService.getCard(id);
      let cardContent = card.content[card.content.length - 1];
      if ((cardContent.felder.frage != ankiCard.fields["Frage"].value || cardContent.felder.antwort != ankiCard.fields["Antwort"].value)
        && ankiCard.fields["Kappi ID"].value != ""

      ) {
        newerInAnki.push({ankiId: ankiCard.noteId, kappiId: id})
      }

      //Search neu in Anki
      if(ankiCard.fields["Kappi ID"].value == ""){
        kartenFehlenInKappi.push({ankiId: ankiCard.noteId,
          frage: ankiCard.fields["Frage"].value,
          antwort: ankiCard.fields["Antwort"].value,
          paket: (await this.getDeckName(ankiCard.noteId))})
      }

    }


    return {
      kartenInAnki: ankiCards.length,
      kartenInKappi: cards.length,
      kartenFehlenInKappi:kartenFehlenInKappi,
      newerInKappi: [...new Set(newerInKappi)],
      gelöscht: gelöscht,
      conflicts: conflicts,
      newerInAnki: newerInAnki,
      kartenFehlenInAnki: kartenFehlenInAnki

    }
  }
  async getDeckName(id: string): Promise<string> {
    let result = await this.invoke(
      "getDecks",
      6,
      {
        "cards":[+id]

      })

    console.log(result, "in 'getDeckName'")
    console.log(Object.getOwnPropertyNames(result)[0], "in 'getDeckName'")
    // @ts-ignore
    return Object.getOwnPropertyNames(result)[0].substring(7)
  }

  async isInAnki(card: Card) {
    let ankiCards = await this.getAllCards();

    // @ts-ignore
    for (let ankiCard of ankiCards) {

      if (ankiCard.fields["Kappi ID"].value == card.id) {

        return true;
      }

    }
    return false;
  }

  async addFrage(card: Card) {


    let models = await this.invoke('modelNames', 6, {})

    // @ts-ignore
    if (!models.includes('Kappi: Default')) {
      await this.addModel();
    }

    this.addDeck(card.paket.join('::'));


    await this.invoke(
      "addNote",
      6,
      {
        "note": {
          "deckName": 'Kappi::' + card.paket.join('::'),
          "modelName": "Kappi: Default",
          "fields": {
            "Frage": card.content[card.content.length - 1].felder.frage,
            "Antwort": card.content[card.content.length - 1].felder.antwort,
            "Kappi ID": card.id,
            "Kappi Time": card.content[card.content.length - 1].time + "",
          },
          "options": {
            "allowDuplicate": false,
            "duplicateScope": "deck",
            "duplicateScopeOptions": {
              "deckName": "Default",
              "checkChildren": false,
              "checkAllModels": false
            }
          },
          "tags": [
            "Kappi"
          ]
        }
      })
  }

  async addModel() {
    await this.invoke(
      "createModel",
      6,
      {

        "modelName": "Kappi: Default",
        "inOrderFields": ["Frage", "Antwort", "Kappi ID", "Kappi Time"],
        "css": ".hiddn{\n" +
          "display:none}\n" +
          "#frage, #antwort{\n" +
          "font-size:3em;\n" +
          "margin:auto;\n" +
          "}",
        "isCloze": false,
        "cardTemplates": [
          {
            "Name": "Karte 1",
            "Front": "{{Frage}}",
            "Back": "{{Antwort}}"
          }
        ]

      })
  }

}
