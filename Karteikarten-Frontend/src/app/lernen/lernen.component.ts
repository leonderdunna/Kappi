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
    this.cardsService.getCards().then(data => { data.subscribe((c: any) => { this.karten = c; console.log(c); this.neueKarte() }) });
    this.statsService.getStats().then(data => { data.subscribe((s: any) => { this.stats = s; console.log(s) }) });

  }

  karten: any[] = [];
  stats: any[] = [];

  settings = { //TODO: müssen später aus dem backend gehohlt werden
    startLeichtigkeit: 2.5, // relative einheiten
    neueProTag: 10,
    lernenSchritte: [1000 * 60, 1000 * 60 * 10],
    startEinfach: 1000 * 60 * 60 * 24 * 4,
    startGut: 1000 * 60 * 60 * 24,
    minIntervall: 1000 * 60 * 60 * 24,
    maxIntervall: 1000 * 60 * 60 * 24 * 365 * 10,
    faktorErneut: 0.75,  //relative einheiten
    erneutSchritte: [1000 * 60 * 10]
  }

  frage = ''
  antwort = ''

  activeCard = '';
  antwortSichtbar = false;


  neueKarte() {
    //TODO auswahl nach status  kommt leider noch vorrübergehend zufällige karte

    let fs = this.stats.filter(e=> {if (e.rubrik = 0|| e.fällig < Date.now()) return true;return false}) //fs steht für gefilterter status NICHT für filesystem
    let s = fs[Math.floor(Math.random() * fs.length)]; // s ist aktiver status
    let c =this.karten[ this.karten.findIndex(e => e.id === s.card) ]

    this.activeCard = s.card;
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
