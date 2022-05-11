import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AnkiService {

  constructor() { }

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
      xhr.send(JSON.stringify({ action, version, params }));
    });
  }

  addDeck(name: string) {
    this.invoke('createDeck', 6, { deck: 'Kappi::' + name })
  }

  addFrage(frage: string, antwort: string, id: string, deck: string) {



    this.invoke(
      "createModel",
      6,
      {
        "params": {
          "modelName": "Kappi Frage",
          "inOrderFields": ["Frage", "Antwort", "link",'Deck'],
          "css": "Optional CSS with default to builtin css",
          "isCloze": false,
          "cardTemplates": [
            {
              "Name": "My Card 1",
              "Front": "Front html {{Field1}}",
              "Back": "Back html  {{Field2}}"
            }
          ]
        }
      })

    this.invoke(
      "addNote",
      6,
      {
        "note": {
          "deckName": 'Kappi::' + deck,
          "modelName": "Kappi Frage",
          "fields": {
            "link": 'localhost:4200/edit/' + id, //TODO änderen zu Kappi
            "Frage": frage,
            'Antwort': antwort,
            'Deck': deck.split('::')[deck.split('::').length - 1]
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
