import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { AnkiService } from '../services/sync/anki.service';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.scss']
})
export class TestComponent implements OnInit {

  constructor(private ankiService: AnkiService,
    private cardsService:CardsService) { }

  ngOnInit(): void {
  }
  click() {
    this.ankiService.addDeck(this.name)
  }

  name: string = '';
addNote(){
  let cards=this.cardsService.getCards()
  for(let c of cards){
    this.ankiService.addNote(c.frage,c.antwort)
  }
}
 

}
