import { Injectable } from '@angular/core';
import { Card } from '../objekte/card/card.model';
import { Strings } from '../resources/strings';
import {Content} from "../objekte/card/content.model";
import {Stat} from "../objekte/card/stat.model";

@Injectable({
  providedIn: 'root'
})
/**
 * Speichert die Karten und stellt methoden bereit, um auf die Karten zuzugreifen
 */
export class CardsService {

  constructor( ) { }


  /**
   * @return Gibt Alle im System gespeicherten Karten als Array zurück
   * wenn diese keine Entwürfe sind
   */
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

  /**
   * @return Gibt alle Karten zurück, die als Entwurf gekennzeichnet wurden
   */
  getEntwürfe():Card[]{
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

  /**
   * @return Gibt eine einzelne Karte aus dem Speicher zurück
   * @param id ID der Karte
   */
  getCard(id: string): Card {
    return JSON.parse(window.localStorage.getItem(Strings.storage.card + id) ?? 'false')
  }


  /**
   * @return gibt true zurück, wenn die Karte gelöscht wurde
   * @param id ID der zu löschenden Karte
   */
  delete(id: string): boolean {
    window.localStorage.removeItem(Strings.storage.card + id);
    let cardsList: string[] = JSON.parse(window.localStorage.getItem(Strings.storage.cardIDs) ?? '[]')

    cardsList = cardsList.filter((e: string) => e != id)
    window.localStorage.setItem(Strings.storage.cardIDs, JSON.stringify(cardsList));
    return true;
  }

  /**
   * @description Aktualisiert eine Karte im Speicher
   * @param card Karte in der aktuellsten Form
   */
  updateCard(card: Card): void {
    window.localStorage.setItem(Strings.storage.card + card.id, JSON.stringify(card))
  }

  /**
   * @description Fügt neuen Kontent zu einer Karte hinzu
   * @param content neuer Content
   * @param id ID der Karte, zu der der Kontent addiert werden soll
   */
  updateCardContent(content:Content,id:string): void {
    let card = this.getCard(id)

    card.content.push(content)
    window.localStorage.setItem(Strings.storage.card + card.id, JSON.stringify(card))
  }

  /**
   * @description Fügt neuen Status zu einer Karte hinzu
   * @param stat neuer Status
   * @param id ID der Karte, zu der der Status addiert werden soll
   */
  updateCardStat(stat: Stat,id:string):void{
    let card = this.getCard(id)
    card.stat.push(stat)
    this.updateCard(card)
  }

}
