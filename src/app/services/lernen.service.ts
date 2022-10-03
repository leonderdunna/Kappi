import {Injectable} from '@angular/core';
import {Settings} from '../objekte/settings.model';
import {Stat} from '../objekte/card/stat.model';
import {Rubriken} from "../resources/rubriken";
import {Antworten} from "../resources/antworten";

@Injectable({
  providedIn: 'root'
})
export class LernenService {


  constructor() {
  }

  zufall() {
    return (Math.random()/10) + 0.95;
  }

  neueKarte(stat: Stat, antwort: number, settings: Settings): Stat {

    if (antwort == Antworten.EINFACH) {
      stat.rubrik = Rubriken.JUNG
      stat.leichtigkeit = settings.startLeichtigkeit;
      stat.intervall = settings.startEinfach;
      stat.due = Date.now() + stat.intervall

    } else if (antwort == Antworten.NOCHMAL || antwort == Antworten.SCHWIERIG) {
      stat.rubrik = Rubriken.LERNEN;
      stat.stufe = 0;
      stat.due = Date.now() + settings.lernenSchritte[0]
    } else if (antwort == Antworten.GUT) {
      stat.rubrik = Rubriken.LERNEN;
      stat.stufe = 1;
      stat.due = Date.now() + settings.lernenSchritte[1]

    }
    return stat;
  }

  lernenKarte(stat: Stat, antwort: number, settings: Settings): Stat {

    if (antwort == Antworten.NOCHMAL) {
      stat.stufe = 0;
      stat.due = Date.now() + settings.lernenSchritte[0]
    } else if (antwort == Antworten.GUT) {
      if ((stat.stufe ?? 0) < settings.lernenSchritte.length - 1) {
        stat.stufe = (stat.stufe ?? 0) + 1
        stat.due = Date.now() + (settings.lernenSchritte[stat.stufe] ?? settings.lernenSchritte[settings.lernenSchritte.length - 1])
      } else {
        stat.stufe = 0;
        stat.rubrik = Rubriken.JUNG;
        stat.leichtigkeit = settings.startLeichtigkeit;
        stat.intervall = settings.startGut;
        stat.due = Date.now() + stat.intervall
      }
    } else if (antwort == Antworten.EINFACH) {
      stat.rubrik = Rubriken.JUNG
      stat.leichtigkeit = settings.startLeichtigkeit;
      stat.intervall = settings.startEinfach;
      stat.due = Date.now() + stat.intervall
    }
    return stat;
  }

  erneutLernenKarte(stat: Stat, antwort: number, settings: Settings): Stat {


    //Überürüfen ob intervall da ist
    if (!stat.intervall) {
      console.error('Intervall bei der karte war vorher nicht da');
    }

    if (antwort == Antworten.NOCHMAL) {
      stat.stufe = 0;
      stat.due = Date.now() + settings.erneutLernenSchritte[0]
    } else if (antwort == Antworten.GUT) {
      if ((stat.stufe ?? 0) < settings.erneutLernenSchritte.length - 1) {
        stat.stufe = ((stat.stufe ?? 0) + 1)
        stat.due = Date.now() + settings.erneutLernenSchritte[stat.stufe]
      } else {
        stat.stufe = 0;
        stat.rubrik = Rubriken.JUNG;
        if (stat.leichtigkeit >= 1.50) {
          stat.leichtigkeit -= 0.20
        } else {
          stat.leichtigkeit = 1.30
        }
        stat.intervall = stat.intervall * settings.faktorNachErneutemLernen;
        stat.due = Date.now() + stat.intervall
      }
    } else if (antwort == Antworten.EINFACH) {
      stat.rubrik = Rubriken.JUNG
      if (stat.leichtigkeit >= 1.35) {
        stat.leichtigkeit -= 0.5
      } else {
        stat.leichtigkeit = 1.30
      }
      stat.intervall = stat.intervall * settings.faktorNachErneutemLernen;
      stat.due = Date.now() + stat.intervall
    }
    return stat;
  }

  jungeOderAlteKarte(stat: Stat, antwort: number, settings: Settings): Stat {


    //Überürüfen ob intervall da ist
    if (!stat.intervall) {
      console.error('Intervall bei der karte war vorher nicht da');
    }


    if (antwort == Antworten.NOCHMAL) {
      stat.rubrik = Rubriken.ERNEUT_LERNEN;
      stat.stufe = 0;
      stat.due = Date.now() + settings.erneutLernenSchritte[0]
    } else if (antwort == Antworten.SCHWIERIG) {
      stat.intervall = (stat.intervall ?? 0) * 1.2;
      if (stat.leichtigkeit >= 1.45)
        stat.leichtigkeit -= 0.15;
      else
        stat.leichtigkeit = 1.30;

      stat.due = Date.now() + stat.intervall;

    } else if (antwort == Antworten.GUT) {
      stat.intervall = stat.intervall * stat.leichtigkeit * this.zufall();
      stat.due = Date.now() + stat.intervall;
    } else if (antwort == Antworten.EINFACH) {
      stat.intervall = stat.intervall * stat.leichtigkeit * settings.bonus * this.zufall();
      stat.leichtigkeit += 0.15;
      stat.due = Date.now() + stat.intervall;
    }
    return stat;
  }


  lernen(antwort: number, stat: Stat, settings: Settings): Stat {

    //Überprüfen ob alles wichtige da ist
    {
      if (!stat) {
        console.error('Stat wurde nicht übermittelt');
      }
      if (!stat.leichtigkeit) {
        console.error('Leichtigkeit bei der karte war vorher nicht da');
      }
      if (!stat.due) {
        console.error('Karte hatte kein Fälligkeitszeitpunkt')
        stat.due = Date.now();
      }
    }


    switch (stat.rubrik) {
      case Rubriken.NEU:
        stat = this.neueKarte(stat, antwort, settings);
        break;
      case Rubriken.LERNEN:
        stat = this.lernenKarte(stat, antwort, settings);
        break;
      case Rubriken.JUNG:
      case Rubriken.ALT:
        stat = this.jungeOderAlteKarte(stat, antwort, settings);
        break;
      case Rubriken.ERNEUT_LERNEN:
        stat = this.erneutLernenKarte(stat, antwort, settings);
        break;

    }


    if (stat.rubrik == Rubriken.JUNG || stat.rubrik == Rubriken.ALT) {

      //Überürüfen ob intervall da ist
      if (!stat.intervall) {
        console.error('Intervall bei der karte war vorher nicht da');
      }

      //wenn intervall über einen monat ist wird die rubrik alt... hat nur einfluss auf eventuelle statistiken
      if (stat.intervall >= 1000 * 60 * 60 * 24 * 30)
        stat.rubrik = Rubriken.ALT;
      else stat.rubrik = Rubriken.JUNG;
    } else stat.gelernt = {zeit: Date.now(), antwort: antwort}


    return stat;
  }

}

