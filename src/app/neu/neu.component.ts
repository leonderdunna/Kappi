import { Component, OnInit } from '@angular/core';
import { Card } from '../objekte/card.model';
import { CardsService } from '../services/cards.service';

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
      this.cards.unshift(this.frage);
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
  cards: string[] = [];
}
