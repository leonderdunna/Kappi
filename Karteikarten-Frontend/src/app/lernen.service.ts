import { Injectable } from '@angular/core';

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

  lernen(antwort: number, c: any, settings: any): any {


    console.log("vorher:")//TODO nur für testzwecke
    console.log(c)


    let zufall = 1;//TODO ist noch kein echter zufall ... sollte später zwischen 0.95 und 1.05 liegen
    if (c.rubrik == false)
      c.rubrik = 0;

    if (c.rubrik == this.RUBRIK_NEU) {
      if (antwort == this.ANTWORT_EINFACH) {
        c.rubrik = this.RUBRIK_JUNG
        c.leichtigkeit = settings.startLeichtigkeit;
        c.intervall = settings.startEinfach;
        c.fällig = Date.now() + c.intervall

      } else if (antwort == this.ANTWORT_NOCHMAL || antwort == this.ANTWORT_SCHWIERIG) {
        c.rubrik = this.RUBRIK_LERNEN;
        c.stufe = 0;
        c.fällig = Date.now() + settings.lernenSchritte[0]
      } else if (antwort == this.ANTWORT_GUT) {
        c.rubrik = this.RUBRIK_LERNEN;
        c.stufe = 1;
        c.fällig = Date.now() + settings.lernenSchritte[1]

      } else { return false }
    }

    else if (c.rubrik == this.RUBRIK_LERNEN) {
      if (antwort == this.ANTWORT_NOCHMAL) {
        c.stufe = 0;
        c.fällig = Date.now() + settings.lernenSchritte[0]
      } else if (antwort == this.ANTWORT_GUT) {
        if (c.stufe < settings.lernenSchritte.length - 1) {
          c.stufe++
          c.fällig = Date.now() + settings.lernenSchritte[c.stufe]
        } else {
          c.stufe = undefined;
          c.rubrik = this.RUBRIK_JUNG;
          c.leichtigkeit = settings.startLeichtigkeit;
          c.intervall = settings.startGut;
          c.fällig = Date.now() + c.intervall
        }
      } else if (antwort = this.ANTWORT_EINFACH) {
        c.rubrik = this.RUBRIK_JUNG
        c.leichtigkeit = settings.startLeichtigkeit;
        c.intervall = settings.startBeiEinfach;
        c.fällig = Date.now() + c.intervall
      } else { return false }
    }
    else if (c.rubrik == this.RUBRIK_JUNG || c.rubrik == this.RUBRIK_ALT) {
      if (antwort == this.ANTWORT_NOCHMAL) {
        c.rubrik = this.RUBRIK_ERNEUT_LERNEN;
        c.stufe = 0;
        c.fällig = Date.now() + settings.erneutLernenSchritte[0]
      } else if (antwort == this.ANTWORT_SCHWIERIG) {
        c.intervall = c.intervall * 1.2;

        if (c.leichtigkeit >= 1.45)
          c.leichtigkeit -= 0.15;
        else
          c.leichtigkeit = 1.30;

        c.fällig = Date.now() + c.intervall;

      } else if (antwort == this.ANTWORT_GUT) {
        c.intervall = c.intervall * c.leichtigkeit * zufall;
        c.fällig = Date.now() + c.intervall;
      } else if (antwort == this.ANTWORT_EINFACH) {
        c.intervall = c.intervall * c.leichtigkeit * settings.bonus * zufall;
        c.leichtigkeit += 0.15;
        c.fällig = Date.now() + c.intervall;
      } else return false
    } else if (c.rubrik == this.RUBRIK_ERNEUT_LERNEN) {
      if (antwort == this.ANTWORT_NOCHMAL) {
        c.stufe = 0;
        c.fällig = Date.now() + settings.erneutLernenSchritte[0]
      } else if (antwort == this.ANTWORT_GUT) {
        if (c.stufe < settings.erneutLernenSchritte.length - 1) {
          c.stufe++
          c.fällig = Date.now() + settings.erneutLernenSchritte[c.stufe]
        } else {
          c.stufe = undefined;
          c.rubrik = this.RUBRIK_JUNG;
          if (c.leichtigkeit >= 1.50) {
            c.leichtigkeit -= 0.20
          } else { c.leichtigkeit = 1.30 }
          c.intervall = c.intervall * settings.faktorNachErneutemLernen;
          c.fällig = Date.now() + c.intervall
        }
      } else if (antwort = this.ANTWORT_EINFACH) {
        c.rubrik = this.RUBRIK_JUNG
        if (c.leichtigkeit >= 1.35) {
          c.leichtigkeit -= 0.5
        } else { c.leichtigkeit = 1.30 }
        c.intervall = c.intervall * settings.faktorNachErneutemLernen;
        c.fällig = Date.now() + c.intervall
      } else return false
    } else return false

    if (c.rubrik == this.RUBRIK_JUNG || c.rubrik == this.RUBRIK_ALT)
      //wenn intervall über einen monat ist wird die rubrik alt... hat nur einfluss auf eventuelle statistiken
      if (c.intervall >= 1000 * 60 * 60 * 24 * 30)
        c.rubrik = this.RUBRIK_ALT;
      else c.rubrik = this.RUBRIK_JUNG;

    if (c.gelernt)
      c.gelernt.push({ "zeit": Date.now(), "antwort": antwort })
    else c.gelernt = [{ "zeit": Date.now(), "antwort": antwort }]


    console.log("nachher:")//TODO nur für testzwecke
    console.log(c)

    return c
  }

}

