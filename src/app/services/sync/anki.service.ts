import {Injectable} from '@angular/core';
import {Card} from "../../objekte/card/card.model";

@Injectable({
  providedIn: 'root'
})
export class AnkiService {

  constructor() {
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

  async getAllCards() {
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



    return cards;
  }

  async isInAnki(card: Card) {
    let ankiCards = await this.getAllCards();
    console.log(ankiCards)
    // @ts-ignore
    for (let ankiCard of ankiCards) {
      let ankiCardContent = JSON.parse(ankiCard.fields.card.value)
      console.log(ankiCardContent.id, card.id)
      if(ankiCardContent.id == card.id){
        console.log(ankiCardContent, card.id)
        return true;
      }

    }
    return false;
  }

  async addFrage(card: Card) {
    if(await this.isInAnki(card)){
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
          "css": "",
          "isCloze": false,
          "cardTemplates": [
            {
              "Name": "My Card 1",
              "Front": "Front:{{card}}",
              "Back": "Back html  {{card}}"
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
