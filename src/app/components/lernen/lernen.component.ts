import { Component, Inject, OnInit } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { LernenService } from '../../services/lernen.service';
import { StatsService } from '../../services/stats.service';
import { SettingsService } from '../../services/settings.service';
import { Router } from '@angular/router';
import { Card } from '../../objekte/card.model';
import { Stat } from '../../objekte/stat.model';
import { Settings } from '../../objekte/settings.model';
import { GelerntService } from '../../services/gelernt.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaketeService } from '../../services/pakete.service';
import { ZusatzComponent} from "../edit/zusatz/zusatz.component";
import {Fortschritt} from "../../objekte/fortschritt.model";

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.scss']
})
export class LernenComponent implements OnInit {
  constructor(private cardsService: CardsService,
    private paketeService: PaketeService,
    private statsService: StatsService,
    private lernenService: LernenService,
    private settingsService: SettingsService,
    private router: Router,
    private gelerntService: GelerntService,
    private dialog: MatDialog) {

    this.neueKarte()

  }


  //
  karten: Card[] = this.paketeService.getActiveCards();
  stats: Stat[] = this.statsService.getStats();
  settings: Settings  = this.settingsService.getSettings();

  karte?:Card;

  defaultfortschritt:Fortschritt={
    antwortSichtbar:false,
    fertig:false,
    hinweisBenoetigt:false,
    skip:false,
    richtig:false,
    falsch:false,
  }


  fortschritt:Fortschritt = this.defaultfortschritt;

  activeCard = '';

  userantwort = '';
  hinweis='';

  routeNeueKarte() {
    this.router.navigate([`neu`])
  }
  routePakete(){
    this.router.navigate(['pakete'])
  }
  edit(id: string) {
    this.router.navigate([`edit/${id}`]);
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
      intervall:0,
      stufe:0,
      gelernt:[],
      "rubrik": 0,
      'fällig': Date.now(),
      'unsynced': true,
      'leichtigkeit': this.settings.startLeichtigkeit,
    })
    this.stats = this.statsService.getStats();
  }

  neueKarte() {

    //Reset all stuf
    this.userantwort = '';
    this.fortschritt=this.defaultfortschritt;

    this.stats = this.statsService.getStats();
    this.karten = this.paketeService.getActiveCards();


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
    this.karte = this.karten[this.karten.findIndex(e => e.id === s.card)]


  }

  //Click handlers und so
  pruefen() {
    if (this.userantwort == this.karte?.antwort) {
      this.fortschritt.richtig = true;
      this.fortschritt.antwortSichtbar=false;
      this.fortschritt.falsch=false;
      this.hinweis='';return;
    }
    let card = this.cardsService.getCard(this.activeCard)
    if (card.alternativAntworten)
      for (let e of card.alternativAntworten)
        if (e == this.userantwort) {
          this.hinweis='<span style="color:green">Richtig! Eine andere Lösung wäre:<span>'
          this.fortschritt.richtig = true;
          this.fortschritt.falsch=false;
          this.fortschritt.antwortSichtbar=true;
          return;
        }

    if (card.fehler)
      for (let e of card.fehler)
        if (e.antwort == this.userantwort) {
          this.fortschritt.hinweisBenoetigt = true;
          this.hinweis = e.hinweis;
          this.fortschritt.antwortSichtbar=false;
          this.fortschritt.falsch = false;
          return;
        }
    this.hinweis = 'Das war leider falsch. Richtig wäre:'
    this.fortschritt.antwortSichtbar = true;
    this.fortschritt.falsch = true;
    //TODO: möglichkeit antwort als doch richtig ...
  }
antwortZeigen(){
    this.fortschritt.richtig = true;
}

  openDialog() {
   let dialogRef = this.dialog.open(ZusatzComponent, {
      data: {
        card: this.activeCard,
        alternative: this.userantwort
      }
    });
    dialogRef.afterClosed().subscribe((result)=>{
      if(!result)return;
      this.pruefen();
    })
  }

  ueberspringen() {
    this.fortschritt.skip = true;
    this.hinweis = 'Diese Karte wurde Übersprungen. Richtig wäre gewesen:'
    this.fortschritt.antwortSichtbar = true;
  }

  keineKartenFällig() {
    this.fortschritt.antwortSichtbar = false;
    this.fortschritt.fertig = true;
  }

  lernen(antwort: number) {
    this.statsService.updateStat(this.lernenService.lernen(
      antwort,
      this.stats.filter(e => {
        return e.card == this.activeCard;

      })[0], this.settings))
    this.neueKarte()

  }

  ngOnInit(): void {
  }

}
