import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { CardsService } from '../cards.service';
import { KartenComponent } from '../karten/karten.component';
import { StatsService } from '../stats.service';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.scss']
})
export class LernenComponent implements OnInit {
  constructor(private cardsService: CardsService, private router: Router, private statsService: StatsService,
    private userService : UserService) {
      this.user = this.userService.getUser();

    this.statsService.getStats().then(data => {
      data.subscribe((s: any) => {
        this.stats = s;

        this.cardsService.getCards().then(data => {
          data.subscribe((c: any) => {
            this.karten = c; console.log(c);
            this.neueKarte()
          })
        });
      })
    });

  }

  user:User;
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
  fertig = false;

  neueKartenHinzufügen() {
    let statIds = this.stats.map(e => { return e.card })
    let cardIds = this.karten.map(e => { return e.id })

    for(let id of cardIds){
      if(!(statIds.indexOf(id)!== -1)){
        this.addStatus(id)
      }
    }
    console.log(statIds)
    console.log(cardIds)

    //KEINE ENDLÖSUNG aber erstmal reichts
    this.statsService.getStats().then(data => {
      data.subscribe((s: any) => {
        this.stats = s;

        this.cardsService.getCards().then(data => {
          data.subscribe((c: any) => {
            this.karten = c; console.log(c);
            //this.neueKarte()
          })
        });
      })
    });

  }

  addStatus(card: any) {
    this.statsService.addStatus({
      "card": card,
      "rubrik": 0,
      "user":this.user.name
    }).then(data=>data.subscribe((d:any)=>console.log(d)))
  }

  neueKarte() {
    console.log(this.stats)
    let fs = this.stats.filter(e => {
      if (e.rubrik == 0 || e.rubrik == false || e.fällig < Date.now()) return true; return false
    }) //fs steht für gefilterter status NICHT für filesystem

    if (fs.length == 0) {
      this.neueKartenHinzufügen();
      this.keineKartenFällig();
      return;
    }

    let s = fs[Math.floor(Math.random() * fs.length)]; // s ist aktiver status
    console.log(s)
    let c = this.karten[this.karten.findIndex(e => e.id === s.card)]
    console.log(c)
    console.log(s)

    this.activeCard = s.card;
    this.frage = c.frage;
    this.antwort = c.antwort;
    this.antwortSichtbar = false;

  }

  //Click handlers und so
  zeigeAntwort() {
    this.antwortSichtbar = true;
  }
  keineKartenFällig() {
    this.antwortSichtbar = false;
    this.fertig = true;
  }

  ngOnInit(): void {
  }

}
