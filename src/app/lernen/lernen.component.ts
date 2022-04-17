import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { LernenService } from '../services/lernen.service';
import { StatsService } from '../services/stats.service';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';
import { Card } from '../objekte/card.model';
import { Stat } from '../objekte/stat.model';
import { Settings } from '../objekte/settings.model';
import { GelerntService } from '../services/gelernt.service';

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
    private router: Router,
    private gelerntService: GelerntService) {
    this.stats = this.statsService.getStats();
    this.karten = this.cardsService.getCards();
    this.settings = this.settingsService.getSettings();
    this.neueKarte()

  }


  karten: Card[] = [];
  stats: Stat[] = [];
  settings: Settings;


  frage = 'Frage wird geladen...'
  antwort = ''

  activeCard = '';
  antwortSichtbar = false;
  fertig = false;

  routeNeueKarte() {
    this.router.navigate([`neu`])
  }

  neueKartenHinzufügen(): boolean {
    let statIds = this.stats.map(e => { return e.card })
    let cardIds = this.karten.map(e => { return e.id })

    let änderung = false
    for (let id of cardIds) {
      if (!id) { console.error('Abgespeicherte karte ohne ID'); continue; }
      if ((statIds.indexOf(id) == -1)) {
        this.addStatus(id)
        änderung = true;
      }
    }
    return änderung;
  }

  addStatus(cardID: string) {
    this.statsService.addStat({
      "card": cardID,
      "rubrik": 0,
      'fällig': Date.now(),
      'unsynced': true,
      'leichtigkeit': this.settings.startLeichtigkeit,
    })
    this.stats = this.statsService.getStats();
  }
  userantwort = '';
  hinweis='';
  neueKarte() {

    this.stats = this.statsService.getStats();
    this.karten = this.cardsService.getCards();


    let fs = this.stats.filter(e => {
      if (!e.fällig) return true;
      if (this.gelerntService.getNeue(0) >= (this.settingsService.getSettings().neueProTag - 0) &&
        e.rubrik == 0)
        return false;
      if (e.rubrik == 0 || e.fällig < Date.now())
        return true;
      return false
    }) //fs steht für gefilterter status NICHT für filesystem

    if (fs.length == 0) {
      if (!this.neueKartenHinzufügen()) {
        this.keineKartenFällig();
        return;
      }
      this.neueKarte();
      return;
    }

    let s = fs[Math.floor(Math.random() * fs.length)]; // s ist aktiver status 
    this.activeCard = s.card;
    if (this.karten.findIndex(e => e.id === s.card) == -1) {
      if (!s.id) { console.error('Stat ohne ID!!!'); return; }
      this.statsService.delete(s.id)
      this.neueKarte();
      return;
    }
    let c = this.karten[this.karten.findIndex(e => e.id === s.card)]
    this.frage = c.frage;
    this.antwort = c.antwort;
    this.antwortSichtbar = false;

  }

  //Click handlers und so
  zeigeAntwort() {
    this.antwortSichtbar = true;
    if(this.userantwort == this.antwort){
      this.antwort=''
      this.hinweis='Das ist richtig!!'
    }
    else{
      this.hinweis='Leider falsch. die richtige antwort wäre:'
    }
  }

  keineKartenFällig() {
    this.antwortSichtbar = false;
    this.fertig = true;
  }

  lernen(antwort: number) {


    //TEST
    console.log(antwort);
    console.log(this.stats.filter(e => {
      if (e.card == this.activeCard)
        return true;
      return false
    })[0])
    console.log(this.settings)

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
    if (!newStat) { console.error('Beim Lernen ist ein Fehler aufgetreen'); return }
    this.stats.push(newStat)

    this.statsService.updateStat(newStat)
    this.neueKarte()
  }

  ngOnInit(): void {
  }

}
