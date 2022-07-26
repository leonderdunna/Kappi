import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Card } from '../objekte/card.model';
import { CardsService } from '../services/cards.service';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-karten',
  templateUrl: './karten.component.html',
  styleUrls: ['./karten.component.scss']
})
export class KartenComponent implements OnInit {

  constructor(private route: ActivatedRoute, private cardsService: CardsService, private router: Router) {
    this.karten = this.cardsService.getCards()
  }
  filter() {
    if (this.paket != '' && this.paket != undefined)
      this.karten = this.cardsService.getCards().filter((e) => {
        if (e.paket[0] == this.paket)
          return true
        return false
      })
    else{
      this.karten=this.cardsService.getCards();
    }
  }
  paket = '';

  ngOnInit(): void {
    this.route.queryParams.subscribe(params=>{
      this.paket = params['paket'];
      this.filter()
    })
  }
  edit(id: string) {
    this.router.navigate([`edit/${id}`]);
  }

  neu() {
    this.router.navigate([`neu`])
  }

  delete(id: string) {
    this.cardsService.delete(id);
    this.filter()

  }

  displayedColumns: string[] = ["frage", 'mehr', 'antwort']
  karten: Card[] = []

}
