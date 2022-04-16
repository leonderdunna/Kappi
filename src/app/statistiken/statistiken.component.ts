import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { StatsService } from '../services/stats.service';

@Component({
  selector: 'app-statistiken',
  templateUrl: './statistiken.component.html',
  styleUrls: ['./statistiken.component.scss']
})
export class StatistikenComponent implements OnInit {

  constructor(private cardsService:CardsService,private statService:StatsService) {
   }
karten = this.cardsService.getCards();
gesamtkartenzahl = this.karten.length;
neueKartenZahl = this.karten.filter((e)=>{if(this.statService.getStatByCardID(e.id?? '').rubrik ==0)return true;return false}).length
kartenJung = this.karten.filter((e)=>{if(this.statService.getStatByCardID(e.id?? '').rubrik ==2)return true;return false}).length
kartenAlt = this.karten.filter((e)=>{if(this.statService.getStatByCardID(e.id?? '').rubrik ==3)return true;return false}).length
lernenunderneut = this.karten.filter((e)=>{if(this.statService.getStatByCardID(e.id?? '').rubrik ==1 ||this.statService.getStatByCardID(e.id?? '').rubrik ==4 )return true;return false}).length
  ngOnInit(): void {
  }

}
