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

  async deleteByKappiID(id: string) {
    let ankiCards = await this.getAllCards();
    // @ts-ignore
    for (let ankiCard of ankiCards) {
      let ankiCardContent = JSON.parse(ankiCard.fields.card.value)
      if (ankiCardContent.id == id) {
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

  async updateAnkiCardByKappiID(id: string) {
    let ankiCards = await this.getAllCards();
    // @ts-ignore
    for (let ankiCard of ankiCards) {
      let ankiCardContent = JSON.parse(ankiCard.fields.card.value)
      if (ankiCardContent.id == id) {
        await this.invoke(
          "updateNoteFields",
          6,
          {
            "note": {
              "id": ankiCard.noteId,
              "fields": {
                "card": JSON.stringify(this.cardsService.getCard(id))
              }
            }
          })
      }

    }
  }

  //TODO: gelöscht muss zu anki id werden und zu aktualisieren muss sowohl anki id als auch kappi id beinhalten.
  async scan(): Promise<{ kartenInAnki: number, kartenInKappi: number, kartenFehlen: any[], kartenZuAktualisieren: any[], gelöscht: any[] }> {
    let ankiCards = await this.getAllCards();
    let cards = this.cardsService.getCards();

    let zuaktualisieren: any[] = [];
    let kartenFehlen: any[] = [];
    let gelöscht: any[] = [];


    for (let card of cards) {
      if (!(await this.isInAnki(card))) {
        kartenFehlen.push(card.id)
        continue;
      }
      for (let ankiCard of ankiCards) {
        let ankiCardContent = JSON.parse(ankiCard.fields.card.value)

        if (card.id == ankiCardContent.id) {
          if (card.content[card.content.length - 1].time > ankiCardContent.content[ankiCardContent.content.length - 1].time) {
            zuaktualisieren.push(card.id)

          }
        }
      }


    }
    for (let ankiCard of ankiCards) {

      let remove = true;
      for (let card of cards) {
        if (JSON.parse(ankiCard.fields.card.value).id == card.id) {
          remove = false
        }
      }
      if (remove) {
        gelöscht.push(JSON.parse(ankiCard.fields.card.value).id)

      }
    }

    return {
      kartenInAnki: ankiCards.length,
      kartenInKappi: cards.length,
      kartenFehlen: kartenFehlen,
      kartenZuAktualisieren: [...new Set(zuaktualisieren)],
      gelöscht: gelöscht,
    }

  }

  async isInAnki(card: Card) {
    let ankiCards = await this.getAllCards();

    // @ts-ignore
    for (let ankiCard of ankiCards) {
      let ankiCardContent = JSON.parse(ankiCard.fields.card.value)

      if (ankiCardContent.id == card.id) {

        return true;
      }

    }
    return false;
  }

  async addFrage(card: Card) {
    if (await this.isInAnki(card)) {
      console.error("Card already in Anki")
      return;
    }

    let models = await this.invoke('modelNames', 6, {})

    // @ts-ignore
    if (!models.includes('Kappi Frage')) {
      await this.invoke(
        "createModel",
        6,
        {

          "modelName": "Kappi Frage",
          "inOrderFields": ["card"],
          "css": ".hiddn{\n" +
            "display:none}\n" +
            "#frage, #antwort{\n" +
            "font-size:3em;\n" +
            "margin:auto;\n" +
            "}",
          "isCloze": false,
          "cardTemplates": [
            {
              "Name": "My Card 1",
              "Front": "<div id=\"frage\">huhu</div>\n" +
                "<div class=\"hiddn frage\">{{card}}</div>\n" +
                "<script>\n" +
                "  let card = JSON.parse(document.querySelector(\".hiddn.frage\").textContent);\n" +
                "        document.querySelector(\"#frage\").textContent = \n" +
                "        card.content[card.content.length-1].felder.frage;\n" +
                "\n" +
                "</script>",
              "Back": "\n" +
                "<div id=\"frage\">huhu</div>\n" +
                "<hr>\n" +
                "<div id=\"antwort\"></div>\n" +
                "<div class=\"hiddn frage\">{{card}}</div>\n" +
                "<script>\n" +
                "  \n" +
                "        document.querySelector(\"#frage\").textContent = \n" +
                "        card.content[card.content.length-1].felder.frage;\n" +
                "document.querySelector(\"#antwort\").textContent=  card.content[card.content.length-1].felder.antwort;\n" +
                "\n" +
                "</script>"
            }
          ]

        })
    }


    this.addDeck(card.paket.join('::'));


    this.invoke(
      "addNote",
      6,
      {
        "note": {
          "deckName": 'Kappi::' + card.paket.join('::'),
          "modelName": "Kappi Frage",
          "fields": {
            "card": JSON.stringify(card)
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

}
