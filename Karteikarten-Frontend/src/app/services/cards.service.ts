import { Injectable } from '@angular/core';

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

  getCards(): any[] {

    let cardIDs: string[] = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs) ?? '[]');
    let cards: any[] = [];
    for (let card of cardIDs) {
      cards.push(this.getCard(card));
    }
    return cards;
  }

  getCard(id: string): any {
    return JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.card + id) ?? 'false')
  }

  addCard(card: any): string {
    card.new = true;
    card.id = this.STORAGE_STRINGS.newIDPräfix + Math.random();
    window.localStorage.setItem(this.STORAGE_STRINGS.card + card.id, JSON.stringify(card))
    let cardsList = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs) ?? '[]')
    cardsList.push(card.id)
    window.localStorage.setItem(this.STORAGE_STRINGS.cardIDs, JSON.stringify(cardsList))
    return card.id;
  }

  delete(id: string): boolean {
    window.localStorage.removeItem(this.STORAGE_STRINGS.card + id);
    let cardsList = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs) ?? '[]')
    console.log(cardsList)
    cardsList = cardsList.filter((e: string) => e != id)
    window.localStorage.setItem(this.STORAGE_STRINGS.cardIDs, JSON.stringify(cardsList));
    return true;
  }

  updateCard(card: any): void {
    card.lastChange = Date.now()
    window.localStorage.setItem(this.STORAGE_STRINGS.card + card.id, JSON.stringify(card))
  }

}
