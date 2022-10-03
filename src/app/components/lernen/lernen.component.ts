import {Component, Inject, OnInit} from '@angular/core';
import {CardsService} from '../../services/cards.service';
import {LernenService} from '../../services/lernen.service';
import {SettingsService} from '../../services/settings.service';
import {Router} from '@angular/router';
import {Card} from '../../objekte/card/card.model';
import {Stat} from '../../objekte/card/stat.model';
import {Settings} from '../../objekte/settings.model';
import {GelerntService} from '../../services/gelernt.service';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {PaketeService} from '../../services/pakete.service';
import {ZusatzComponent} from "../edit/zusatz/zusatz.component";
import {Fortschritt} from "../../objekte/fortschritt.model";
import {Defaults} from "../../objekte/Defaults";
import {Rubriken} from "../../resources/rubriken";

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.scss']
})
/**
 * @description UI-Komponente, die die Lernfunktion darstellt
 */
export class LernenComponent {
  constructor(private cardsService: CardsService,
              private paketeService: PaketeService,
              private lernenService: LernenService,
              private settingsService: SettingsService,
              private router: Router,
              private gelerntService: GelerntService,
              private dialog: MatDialog) {

    this.neueKarte()

  }


  //
  karten: Card[] = this.paketeService.getActiveCards();

  settings: Settings = this.settingsService.getSettings();

  karte:Card = Defaults.card();

  defaultfortschritt: Fortschritt = {
    antwortSichtbar: false,
    fertig: false,
    hinweisBenoetigt: false,
    skip: false,
    richtig: false,
    falsch: false,
  }


  fortschritt: Fortschritt = {...this.defaultfortschritt};

  activeCard = '';

  userantwort = '';
  hinweis = '';

  /**
   * @description Weiterleitung zum Erstellen einer neuen Karte
   */
  routeNeueKarte() {
    this.router.navigate([`neu`])
  }

  /**
   * @description Weiterleitung zu den Paketen
   */
  routePakete() {
    this.router.navigate(['pakete'])
  }

  /**
   * @description Weiterleitung zum Bearbeiten der Karte
   * @param id ID der Karte die bearbeitet werden soll
   */
  edit(id: string) {
    this.router.navigate([`edit/${id}`]);
  }


  /**
   * @description Wurde eine Karte beantwortet, wird eine neue Karte geladen
   * und der Zustand des UI zurückgesetzt
   */
  neueKarte() {

    //Reset all stuf
    this.userantwort = '';

    this.fortschritt ={... this.defaultfortschritt};


    this.karten = this.paketeService.getActiveCards();


    let fälligeKarten = this.karten.filter(card => {
      let stat = card.stat[card.stat.length - 1];

      //if (!stat.due) return true;  //Ich weiß nicht mehr was das tut. vielleicht ist es wichtig. kp habs erstmal auskommentiert
      if (this.gelerntService.getNeue(0) >= (this.settingsService.getSettings().neueProTag - 0) &&
        stat.rubrik == Rubriken.NEU)
        return false;
      if (stat.rubrik == Rubriken.NEU || stat.due < Date.now())
        return true;
      return false
    })

    if (fälligeKarten.length == 0) {
      this.keineKartenFällig();
      return;
    }

    this.karte = fälligeKarten[Math.floor(Math.random() * fälligeKarten.length)]; // s ist aktiver status
    this.activeCard = this.karte.id;


  }

  /**
   * @description Überprüft ob die Antwort richtig ist, bzw. lädt den Hinweis
   */
  pruefen() {
    if (this.userantwort == this.karte?.content[this.karte?.content.length - 1].felder.antwort) {
      this.fortschritt.richtig = true;
      this.fortschritt.antwortSichtbar = false;
      this.fortschritt.falsch = false;
      this.hinweis = '';
      return;
    }
    let card = this.cardsService.getCard(this.activeCard)
    if (card.content[card.content.length - 1].felder.alternativAntworten)
      for (let e of card.content[card.content.length - 1].felder.alternativAntworten ?? []) {
        if (e == this.userantwort) {
          this.hinweis = '<span style="color:green">Richtig! Eine andere Lösung wäre:<span>'
          this.fortschritt.richtig = true;
          this.fortschritt.falsch = false;
          this.fortschritt.antwortSichtbar = true;
          return;
        }
      }

    if (card.content[card.content.length - 1].felder.fehler)
      for (let e of card.content[card.content.length - 1].felder.fehler ?? []) {
        if (e.antwort == this.userantwort) {
          this.fortschritt.hinweisBenoetigt = true;
          this.hinweis = e.hinweis;
          this.fortschritt.antwortSichtbar = false;
          this.fortschritt.falsch = false;
          return;
        }
        this.hinweis = 'Das war leider falsch. Richtig wäre:'
        this.fortschritt.antwortSichtbar = true;
        this.fortschritt.falsch = true;
        //TODO: möglichkeit antwort als doch richtig ...
      }
  }

  /**
   * @description Setzt den UI-Fortschritt auf richtig, sodass die Antwort, sowie
   * die Schaltflächen 'gut' und 'einfach' angezeigt werden
   */
  antwortZeigen() {
    this.fortschritt.richtig = true;
  }

  /**
   * @description Öffnet das Dialogfeld zum Ergänzen fehlender Antworten und Hinweise
   */
  openDialog() {
    let dialogRef = this.dialog.open(ZusatzComponent, {
      data: {
        card: this.activeCard,
        alternative: this.userantwort
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (!result) return;
      this.pruefen();
    })
  }

  /**
   * @description Karte wird Übersprungen, die Richtige antwort wird angezeigt
   * nur 'nochmal' bleibt als Schaltfläche
   */
  ueberspringen() {
    this.fortschritt.skip = true;
    this.hinweis = 'Diese Karte wurde Übersprungen. Richtig wäre gewesen:'
    this.fortschritt.antwortSichtbar = true;
  }

  /**
   * @description Motivierende Nachricht, wenn keine Karten mehr fällig sind
   */
  keineKartenFällig() {
    this.fortschritt.antwortSichtbar = false;
    this.fortschritt.fertig = true;
  }

  /**
   * @description Übergibt die Antwort an den LernService, und gibt den daraus resultierenden
   * neuen Status an den CardsService weiter
   * @param antwort
   */
  lernen(antwort: number
  ) {
    this.cardsService.updateCardStat(this.lernenService.lernen(
      antwort,
      this.karte?.stat[(this.karte?.stat.length?? 1)-1]?? function (){
        console.error('Karte nicht gefunden')
        return Defaults.cardStat();
      }(), this.settings), this.karte?.id ?? function () {
      console.error("karte nicht gefunden");
      return "no_ID"
    }())
    this.neueKarte()

  }


}
