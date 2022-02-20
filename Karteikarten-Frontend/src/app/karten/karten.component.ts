import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-karten',
  templateUrl: './karten.component.html',
  styleUrls: ['./karten.component.scss']
})
export class KartenComponent implements OnInit {


  constructor(private cardsService:CardsService) {
    this.karten = cardsService.getCards()
   }

 
  ngOnInit(): void {
  }

  displayedColumns:string[] = ["frage",'Bearbeiten','antwort']
  karten = []
}
