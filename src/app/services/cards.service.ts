import { Injectable } from '@angular/core';
import { Card } from '../objekte/card/card.model';
import { Strings } from '../resources/strings';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor( ) { }


  getCards(): Card[] {

    let cardIDs: string[] = JSON.parse(window.localStorage.getItem(Strings.storage.cardIDs) ?? '[]');
    let cards: Card[] = [];
    for (let card of cardIDs) {
      cards.push(this.getCard(card));
    }
    cards = cards.filter((card) => {
      if (card.content[card.content.length - 1].entwurf)
        return false
      return true
    })
    return cards;
  }
  getEntwürfe(){
    let cardIDs: string[] = JSON.parse(window.localStorage.getItem(Strings.storage.cardIDs) ?? '[]');
    let cards: Card[] = [];
    for (let card of cardIDs) {
      cards.push(this.getCard(card));
    }
    cards = cards.filter((card) => {
      if (card.content[card.content.length - 1].entwurf)
        return true
      return false
    })
    return cards;
  }

  getCard(id: string): Card {
    return JSON.parse(window.localStorage.getItem(Strings.storage.card + id) ?? 'false')
  }



  delete(id: string): boolean {
    window.localStorage.removeItem(Strings.storage.card + id);
    let cardsList: string[] = JSON.parse(window.localStorage.getItem(Strings.storage.cardIDs) ?? '[]')

    cardsList = cardsList.filter((e: string) => e != id)
    window.localStorage.setItem(Strings.storage.cardIDs, JSON.stringify(cardsList));
    return true;
  }

  updateCard(card: Card): void {
    window.localStorage.setItem(Strings.storage.card + card.id, JSON.stringify(card))
  }

}
