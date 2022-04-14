import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-neu',
  templateUrl: './neu.component.html',
  styleUrls: ['./neu.component.scss']
})
export class NeuComponent implements OnInit {

  constructor(private cardsService: CardsService) { }

  ngOnInit(): void {
  }
  frage = '';
  antwort = '';

  add() {
    if (this.frage != '' && this.antwort != '') {
      this.cardsService.addCard({ frage: this.frage, antwort: this.antwort });
      this.cards.push(this.frage);
      this.frage = '';
      this.antwort = '';
    }
    else {
      alert("Bitte geben sie eine Frage und eine Antwort ein!")
    }
  }
  verwerfen() {
    this.frage = '';
    this.antwort = '';
  }
  cards: any[] = [];
}
