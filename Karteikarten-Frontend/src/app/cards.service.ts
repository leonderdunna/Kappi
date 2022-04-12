import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor() { }

  STORAGE_STRINGS: any = {
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
    card.id = this.STORAGE_STRINGS.newIDPRäfix + Math.random();
    window.localStorage.setItem(this.STORAGE_STRINGS.card + card.id, JSON.stringify(card))
    window.localStorage.setItem(this.STORAGE_STRINGS.cardIDs, JSON.stringify(JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs)??'[]').push(card.id)))
    return card.id;
  }



  delete(id: string): boolean {
    window.localStorage.removeItem(this.STORAGE_STRINGS.card + id);
    window.localStorage.setItem(this.STORAGE_STRINGS.cardIDs, JSON.stringify(JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.cardIDs)??'[]').remove(id)));
    return true;

  }

}
