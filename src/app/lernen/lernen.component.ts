import { Component, Inject, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { LernenService } from '../services/lernen.service';
import { StatsService } from '../services/stats.service';
import { SettingsService } from '../services/settings.service';
import { Router } from '@angular/router';
import { Card } from '../objekte/card.model';
import { Stat } from '../objekte/stat.model';
import { Settings } from '../objekte/settings.model';
import { GelerntService } from '../services/gelernt.service';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { PaketeService } from '../services/pakete.service';

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
    this.stats = this.statsService.getStats();
    this.karten = this.paketeService.getActiveCards();
    this.settings = this.settingsService.getSettings();
    this.neueKarte()

  }


  karten: Card[] = [];
  stats: Stat[] = [];
  settings: Settings;


  frage = 'Frage wird geladen...'
  antwort = ''
  material=''

  activeCard = '';
  antwortSichtbar = false;
  fertig = false;

  userantwort = '';
  hinweis = '';
  hinweisBenoetigt = false;
  skip = false;
  richtig = false;
  falsch = false;


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
    this.hinweis = '';
    this.hinweisBenoetigt = false;
    this.skip = false;
    this.richtig = false;
    this.antwortSichtbar = false;
    this.falsch = false;

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
    let c = this.karten[this.karten.findIndex(e => e.id === s.card)]
    this.frage = c.frage;
    this.antwort = c.antwort;
    this.antwortSichtbar = false;
    if(c.material){
      this.material=c.material
    }

  }

  //Click handlers und so
  pruefen() {
    if (this.userantwort == this.antwort) {
      this.richtig = true; 
      this.antwortSichtbar=false;
      this.falsch=false;
      this.hinweis='';return;
    }
    let card = this.cardsService.getCard(this.activeCard)
    if (card.alternativAntworten)
      for (let e of card.alternativAntworten)
        if (e == this.userantwort) {
          this.hinweis='<span style="color:green">Richtig! Eine andere Lösung wäre:<span>'
          this.richtig = true;
          this.falsch=false;
          this.antwortSichtbar=true;
          return;
        }

    if (card.fehler)
      for (let e of card.fehler)
        if (e.antwort == this.userantwort) {
          this.hinweisBenoetigt = true;
          this.hinweis = e.hinweis;
          this.antwortSichtbar=false;
          this.falsch = false;
          return;
        }
    this.hinweis = 'Das war leider falsch. Richtig wäre:'
    this.antwortSichtbar = true;
    this.falsch = true;
    //TODO: möglichkeit antwort als doch richtig ...
  }

  openDialog() {
   let dialogRef = this.dialog.open(AddAlternativeDialog, {
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
    this.skip = true;
    this.hinweis = 'Diese Karte wurde Übersprungen. Richtig wäre gewesen:'
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
    if (!newStat) { console.error('Beim Lernen ist ein Fehler aufgetreen'); return }
    this.stats.push(newStat)

    this.statsService.updateStat(newStat)
    this.neueKarte()

  }

  ngOnInit(): void {
  }

}

@Component({
  selector: 'add-alternative-dialog',
  templateUrl: 'alternative-dialog.html',
  styleUrls: ['dialog.scss']
})
export class AddAlternativeDialog {
  constructor(private cardsService: CardsService,
    public dialogRef: MatDialogRef<AddAlternativeDialog>,
    @Inject(MAT_DIALOG_DATA)
    public data: { card: string, alternative: string },
  ) {

  }
  hinweis: string = '';
  falsch: boolean = false;
  add() {
    let card = this.cardsService.getCard(this.data.card)
    if (this.falsch) {
      if (!(this.hinweis != '' && this.data.alternative != '')) { alert('Bitte geben Sie alle nötigen Informationen an'); return }
      if (card.fehler) {
        for(let f of card.fehler){
          if(f.antwort == this.data.alternative){ alert('Diese Antwort existiert schon'); return }
        }
        card.fehler.push({ hinweis: this.hinweis, antwort: this.data.alternative })
      } else {
        card.fehler = [{ hinweis: this.hinweis, antwort: this.data.alternative }]
      }

    } else {
      if (!(this.data.alternative != '')) { alert('Bitte geben Sie alle nötigen Informationen an'); return }
      if (card.alternativAntworten) {
        for(let f of card.alternativAntworten){
          if(f == this.data.alternative){ alert('Diese Antwort existiert schon'); return }
        }
        card.alternativAntworten.push(this.data.alternative)
      }
      else {
        card.alternativAntworten = [this.data.alternative]
      }

    }
    this.cardsService.updateCard(card)
    this.dialogRef.close(true)
  }
}