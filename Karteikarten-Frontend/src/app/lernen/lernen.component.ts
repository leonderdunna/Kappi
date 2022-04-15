import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { LernenService } from '../services/lernen.service';
import { StatsService } from '../services/stats.service';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';
import { Card } from '../objekte/card.model';

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.scss']
})
export class LernenComponent implements OnInit {
  constructor(private cardsService: CardsService,
    private statsService: StatsService,
    private lernenService: LernenService,
    private settingsService: SettingsService,
    private router: Router) {
    this.stats = this.statsService.getStats();
    this.karten = this.cardsService.getCards();
    this.settings = this.settingsService.getSettings();
    
  }


  karten: Card[] = [];
  stats: any[] = [];
  settings: any;


  frage = 'Frage wird geladen...'
  antwort = ''

  activeCard = '';
  antwortSichtbar = false;
  fertig = false;

  routeNeueKarte() {
    this.router.navigate([`neu`])
  }
  neueKartenHinzufügen() {
    let statIds = this.stats.map(e => { return e.card })
    let cardIds = this.karten.map(e => { return e.id })

    for (let id of cardIds) {
      if ((statIds.indexOf(id) == -1)) {
        this.addStatus(id)
      }
    }
  }

  addStatus(cardID: string) {
    this.statsService.addStat({
      "card": cardID,
      "rubrik": 0,
    })
  }

  neueKarte() {


    let fs = this.stats.filter(e => {
      if (e.rubrik == 0 || e.rubrik == false || e.fällig < Date.now()) return true; return false
    }) //fs steht für gefilterter status NICHT für filesystem

    if (fs.length == 0) {
      this.neueKartenHinzufügen();
      this.keineKartenFällig();
      return;
    }

    let s = fs[Math.floor(Math.random() * fs.length)]; // s ist aktiver status 
    this.activeCard = s.card;
    let c = this.karten[this.karten.findIndex(e => e.id === s.card)]
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

  lernen(antwort: number) {


    let newStat = this.lernenService.lernen(
      antwort,
      this.stats.filter(e => {
        if (e.card == this.activeCard)
          return true;
        return false
      })[0], this.settings)

    this.stats = this.stats.filter(e => {
      if (e.card == this.activeCard)
        return false;
      return true
    })
    this.stats.push(newStat)

    this.statsService.updateStat(newStat)
    this.neueKarte()
  }


  ngOnInit(): void {
  }

}
