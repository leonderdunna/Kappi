import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../objekte/card.model';
import { CardsService } from '../services/cards.service';

@Component({
  selector: 'app-karten',
  templateUrl: './karten.component.html',
  styleUrls: ['./karten.component.scss']
})
export class KartenComponent implements OnInit {

  constructor(private cardsService: CardsService, private router: Router) {
    this.karten = this.cardsService.getCards()
  }


  ngOnInit(): void {
  }
  edit(id: string) {
    this.router.navigate([`edit/${id}`]);
  }

  neu() {
    this.router.navigate([`neu`])
  }

  delete(id: string) {
    this.cardsService.delete(id);
    this.karten = this.cardsService.getCards();

  }

  displayedColumns: string[] = ["frage", 'mehr', 'antwort']
  karten: Card[] = []

}
