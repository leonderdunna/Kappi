import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../cards.service';
import { KartenComponent } from '../karten/karten.component';
import { StatsService } from '../stats.service';

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.scss']
})
export class LernenComponent implements OnInit {
  constructor(private cardsService: CardsService, private router: Router, private statsService: StatsService) {
    this.cardsService.getCards().then(data => { data.subscribe((c: any) => { this.karten = c; console.log(c);this.neueKarte() }) });
    this.statsService.getStats().then(data => { data.subscribe((s: any) => { this.stats = s; console.log(s) }) });

  }

  karten:any[] = [];
  stats = [];

  frage = ''
  antwort = ''

  activeCard = '';
  antwortSichtbar = false;


  neueKarte(){
    // auswahl nach status  kommt níhc vorrübergehend zufällige karte
    let c = this.karten[Math.floor(Math.random() * this.karten.length)]; 

    this.activeCard = c.id;
    this.frage = c.frage;
    this.antwort = c.antwort
    this.antwortSichtbar = false;

  }

  //Click handlers und so
  zeigeAntwort() {
    this.antwortSichtbar = true;
  }




  ngOnInit(): void {
  }

}
