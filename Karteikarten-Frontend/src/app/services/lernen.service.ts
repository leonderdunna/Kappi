import { Injectable } from '@angular/core';
import { Settings } from '../objekte/settings.model';
import { Stat } from '../objekte/stat.model';

@Injectable({
  providedIn: 'root'
})
export class LernenService {

  ANTWORT_NOCHMAL = 0;
  ANTWORT_SCHWIERIG = 1;
  ANTWORT_GUT = 2;
  ANTWORT_EINFACH = 3;

  RUBRIK_NEU = 0;
  RUBRIK_LERNEN = 1;
  RUBRIK_JUNG = 2;
  RUBRIK_ALT = 3;
  RUBRIK_ERNEUT_LERNEN = 4;


  constructor() { }

  lernen(antwort: number, stat: Stat, settings: Settings): Stat | false {

    //Überprüfen ob alles wichtige da ist
    if(!stat.leichtigkeit){console.error('Leichtigkeit bei der karte war vorher nicht da');return false;}
    if(!stat.intervall){console.error('Intervall bei der karte war vorher nicht da');return false;}


    console.log("vorher:")//TODO nur für testzwecke
    console.log(stat)


    let zufall = 1;//TODO ist noch kein echter zufall ... sollte später zwischen 0.95 und 1.05 liegen

    if (stat.rubrik == this.RUBRIK_NEU) {
      if (antwort == this.ANTWORT_EINFACH) {
        stat.rubrik = this.RUBRIK_JUNG
        stat.leichtigkeit = settings.startLeichtigkeit;
        stat.intervall = settings.startEinfach;
        stat.fällig = Date.now() + stat.intervall

      } else if (antwort == this.ANTWORT_NOCHMAL || antwort == this.ANTWORT_SCHWIERIG) {
        stat.rubrik = this.RUBRIK_LERNEN;
        stat.stufe = 0;
        stat.fällig = Date.now() + settings.lernenSchritte[0]
      } else if (antwort == this.ANTWORT_GUT) {
        stat.rubrik = this.RUBRIK_LERNEN;
        stat.stufe = 1;
        stat.fällig = Date.now() + settings.lernenSchritte[1]

      } else { return false }
    }

    else if (stat.rubrik == this.RUBRIK_LERNEN) {
      if (antwort == this.ANTWORT_NOCHMAL) {
        stat.stufe = 0;
        stat.fällig = Date.now() + settings.lernenSchritte[0]
      } else if (antwort == this.ANTWORT_GUT) {
        if (stat.stufe ?? 0 < settings.lernenSchritte.length - 1) {
          stat.stufe = (stat.stufe ?? 0) + 1
          stat.fällig = Date.now() + settings.lernenSchritte[stat.stufe]
        } else {
          stat.stufe = undefined;
          stat.rubrik = this.RUBRIK_JUNG;
          stat.leichtigkeit = settings.startLeichtigkeit;
          stat.intervall = settings.startGut;
          stat.fällig = Date.now() + stat.intervall
        }
      } else if (antwort = this.ANTWORT_EINFACH) {
        stat.rubrik = this.RUBRIK_JUNG
        stat.leichtigkeit = settings.startLeichtigkeit;
        stat.intervall = settings.startEinfach;
        stat.fällig = Date.now() + stat.intervall
      } else { return false }
    }
    else if (stat.rubrik == this.RUBRIK_JUNG || stat.rubrik == this.RUBRIK_ALT) {
      if (antwort == this.ANTWORT_NOCHMAL) {
        stat.rubrik = this.RUBRIK_ERNEUT_LERNEN;
        stat.stufe = 0;
        stat.fällig = Date.now() + settings.erneutLernenSchritte[0]
      } else if (antwort == this.ANTWORT_SCHWIERIG) {
        stat.intervall = stat.intervall ?? Date.now() * 1.2;
        if (stat.leichtigkeit >= 1.45)
          stat.leichtigkeit -= 0.15;
        else
          stat.leichtigkeit = 1.30;

        stat.fällig = Date.now() + stat.intervall;

      } else if (antwort == this.ANTWORT_GUT) {
        stat.intervall = stat.intervall * stat.leichtigkeit * zufall;
        stat.fällig = Date.now() + stat.intervall;
      } else if (antwort == this.ANTWORT_EINFACH) {
        stat.intervall = stat.intervall * stat.leichtigkeit * settings.bonus * zufall;
        stat.leichtigkeit += 0.15;
        stat.fällig = Date.now() + stat.intervall;
      } else return false
    } else if (stat.rubrik == this.RUBRIK_ERNEUT_LERNEN) {
      if (antwort == this.ANTWORT_NOCHMAL) {
        stat.stufe = 0;
        stat.fällig = Date.now() + settings.erneutLernenSchritte[0]
      } else if (antwort == this.ANTWORT_GUT) {
        if (stat.stufe ?? 0 < settings.erneutLernenSchritte.length - 1) {
          stat.stufe = (stat.stufe ?? 0 + 1)
          stat.fällig = Date.now() + settings.erneutLernenSchritte[stat.stufe]
        } else {
          stat.stufe = undefined;
          stat.rubrik = this.RUBRIK_JUNG;
          if (stat.leichtigkeit >= 1.50) {
            stat.leichtigkeit -= 0.20
          } else { stat.leichtigkeit = 1.30 }
          stat.intervall = stat.intervall * settings.faktorNachErneutemLernen;
          stat.fällig = Date.now() + stat.intervall
        }
      } else if (antwort = this.ANTWORT_EINFACH) {
        stat.rubrik = this.RUBRIK_JUNG
        if (stat.leichtigkeit >= 1.35) {
          stat.leichtigkeit -= 0.5
        } else { stat.leichtigkeit = 1.30 }
        stat.intervall = stat.intervall * settings.faktorNachErneutemLernen;
        stat.fällig = Date.now() + stat.intervall
      } else return false
    } else return false

    if (stat.rubrik == this.RUBRIK_JUNG || stat.rubrik == this.RUBRIK_ALT)
      //wenn intervall über einen monat ist wird die rubrik alt... hat nur einfluss auf eventuelle statistiken
      if (stat.intervall >= 1000 * 60 * 60 * 24 * 30)
        stat.rubrik = this.RUBRIK_ALT;
      else stat.rubrik = this.RUBRIK_JUNG;

    if (stat.gelernt)
      stat.gelernt.push({ "zeit": Date.now(), "antwort": antwort })
    else stat.gelernt = [{ "zeit": Date.now(), "antwort": antwort }]


    console.log("nachher:")//TODO nur für testzwecke
    console.log(stat)

    return stat;
  }

}

