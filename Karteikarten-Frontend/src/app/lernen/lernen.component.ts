import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../cards.service';
import { LernenService } from '../lernen.service';
import { StatsService } from '../stats.service';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { SettingsService } from '../settings.service';

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.scss']
})
export class LernenComponent implements OnInit {
  constructor(private cardsService: CardsService,
    private router: Router,
    private statsService: StatsService,
    private userService: UserService,
    private lernenService: LernenService,
    private settingsService: SettingsService) {
    this.user = this.userService.getUser();
    this.stats = this.statsService.getStats();
    this.karten = this.cardsService.getCards();
    this.settings = this.settingsService.getSettings();

  }


  user: User;
  karten: any[] = [];
  stats: any[] = [];
  settings: any;


  frage = 'Frage wird geladen...'
  antwort = ''

  activeCard = '';
  antwortSichtbar = false;
  fertig = false;

  neueKartenHinzufügen() {
    let änderung = false
    let statIds = this.stats.map(e => { return e.card })
    let cardIds = this.karten.map(e => { return e.id })

    for (let id of cardIds) {
      if ((statIds.indexOf(id) == -1)) {
        this.addStatus(id)
        änderung = true;
      }
    }

    console.log("karten die übernommen wurden: neueKartenHinzufügen():")
    console.log(statIds)
    console.log("alle kartenids neueKartenHinzufügen():")
    console.log(cardIds)

    //KEINE ENDLÖSUNG aber erstmal reichts
    if (änderung)
      location.reload();

  }

  addStatus(card: any) {
    this.statsService.addStat({
      "card": card,
      "rubrik": 0,
      "user": this.user.name
    })
  }

  neueKarte() {

    if (this.user.name == 'public') {
      let c = this.karten[Math.floor(Math.random() * this.karten.length)]

      this.frage = c.frage;
      this.antwort = c.antwort;
      this.antwortSichtbar = false;
      return;
    }

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
