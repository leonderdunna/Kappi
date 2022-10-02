import {Component, OnInit} from '@angular/core';
import {CardsService} from '../../services/cards.service';
import {AnkiService} from '../../services/sync/anki.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent {

  constructor(private ankiService: AnkiService,
              private cardsService: CardsService) {
  }


  addDeck(deck: string) {
    this.ankiService.addDeck(deck)
  }

  async log() {
    console.log(await this.ankiService.getAllCards())
  }


  name: string = '';

 async addNote() {
    for (let card of this.cardsService.getCards())
    await  this.ankiService.addFrage(card)
  }
  getAnki(){
    this.ankiService.getAllCards()
  }


}
