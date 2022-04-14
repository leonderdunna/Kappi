import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../cards.service';

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
  edit(id: any) {
    console.log("karte deren editor geöffnet wird ( edit() )")
    console.log(id)
    this.router.navigate([`edit/${id}`]);
  }

  neu() {
    this.router.navigate([`neu`])
  }

  delete(id: any) {
    this.cardsService.delete(id);
    this.karten = this.cardsService.getCards();

  }

  displayedColumns: string[] = ["frage", 'mehr', 'antwort']
  karten: any[] = []

}
