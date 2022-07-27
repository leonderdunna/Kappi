import { Injectable } from '@angular/core';
import { Card } from '../objekte/card.model';


@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { }

  STORAGE_STRINGS: { cardIDs: string, card: string, newIDPräfix: string } = {
    "cardIDs": "cardIDs",
    "card": "card",
    "newIDPräfix": "unSyncdCard"
  }

  getCards(): Card[] {

    let cardIDs: string[] = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs) ?? '[]');
    let cards: Card[] = [];
    for (let card of cardIDs) {
      cards.push(this.getCard(card));
    }
    cards = cards.filter((card) => {
      if (card.entwurf)
        return false
      return true
    })
    return cards;
  }
  getEntwürfe(){
    let cardIDs: string[] = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs) ?? '[]');
    let cards: Card[] = [];
    for (let card of cardIDs) {
      cards.push(this.getCard(card));
    }
    cards = cards.filter((card) => {
      if (card.entwurf)
        return true
      return false
    })
    return cards;
  }

  getCard(id: string): Card {
    return JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.card + id) ?? 'false')
  }

  newCard(): string {
    let card: Card = {
      unsynced: true,
      entwurf: true,
      frage: '',
      antwort: '',
      paket: ['Standard'],
      id: this.STORAGE_STRINGS.newIDPräfix + Math.random(),
    }
    window.localStorage.setItem(this.STORAGE_STRINGS.card + card.id, JSON.stringify(card))
    let cardsList = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs) ?? '[]')
    cardsList.push(card.id)
    window.localStorage.setItem(this.STORAGE_STRINGS.cardIDs, JSON.stringify(cardsList))
    return card.id;
  }

  delete(id: string): boolean {
    window.localStorage.removeItem(this.STORAGE_STRINGS.card + id);
    let cardsList: string[] = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs) ?? '[]')

    cardsList = cardsList.filter((e: string) => e != id)
    window.localStorage.setItem(this.STORAGE_STRINGS.cardIDs, JSON.stringify(cardsList));
    return true;
  }

  updateCard(card: Card): void {
    card.lastChange = Date.now()
    window.localStorage.setItem(this.STORAGE_STRINGS.card + card.id, JSON.stringify(card))
  }

}
