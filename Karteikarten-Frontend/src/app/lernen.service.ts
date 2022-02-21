import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LernenService {

  constructor() { }


  // lernen(antwort: number, card: string,) {

  //   c = this.userService.getStatus(card);


  //   if (c.rubrik == RUBRIK_NEU) {
  //     if (antwort == ANTWORT_EINFACH) {
  //       c.rubrik = RUBRIK_JUNG
  //       c.leichtigkeit = startLeichtigkeit;
  //       c.intervall = startBeiEinfach;
  //       c.fällig = Date.now() + c.intervall

  //     } else if (antwort == ANTWORT_NOCHMAL) {
  //       c.rubrik = RUBRIK_LERNEN;
  //       c.stufe = 0;
  //       c.fällig = Date.now() + lernenSchritte[0]
  //     } else if (antwort == ANTWORT_GUT) {
  //       c.rubrik = RUBRIK_LERNEN;
  //       c.stufe = 1;
  //       c.fällig = Date.now() + lernenSchritte[1]
  //     } else { return false }
  //   }

  //   else if (c.rubrik == RUBRIK_LERNEN) {
  //     if (antwort == ANTWORT_NOCHMAL) {
  //       c.stufe = 0;
  //       c.fällig = Date.now() + lernenSchritte[0]
  //     } else if (antwort == ANTWORT_GUT) {
  //       if (c.stufe < lernenSchritte.length - 1) {
  //         c.stufe++
  //         c.fällig = Date.now() + lernenSchritte[c.stufe]
  //       } else {
  //         c.stufe = undefined;
  //         c.rubrik = RUBRIK_JUNG;
  //         c.leichtigkeit = startLeichtigkeit;
  //         c.intervall = startBeiGut;
  //         c.fällig = Date.now() + c.intervall
  //       }
  //     } else if (antwort = ANTWORT_EINFACH) {
  //       c.rubrik = RUBRIK_JUNG
  //       c.leichtigkeit = startLeichtigkeit;
  //       c.intervall = startBeiEinfach;
  //       c.fällig = Date.now() + c.intervall
  //     } else { return false }
  //   }
  //   else if (c.rubrik == RUBRIK_JUNG || c.rubrik == RUBRIK_ALT) {
  //     if (antwort == ANTWORT_NOCHMAL) {
  //       c.rubrik = RUBRIK_ERNEUT_LERNEN;
  //       c.stufe = 0;
  //       c.fällig = Date.now() + erneutLernenSchritte[0]
  //     } else if (antwort == ANTWORT_SCHWIERIG) {
  //       c.intervall = c.intervall * 1.2;

  //       if (c.leichtigkeit >= 1.45)
  //         c.leichtigkeit -= 0.15;
  //       else
  //         c.leichtigkeit = 1.30;

  //       c.fällig = Date.now() + c.intervall;

  //     } else if (antwort == ANTWORT_GUT) {
  //       c.intervall = c.intervall * c.leichtigkeit * zufall;
  //       c.fällig = Date.now() + c.intervall;
  //     } else if (antwort == ANTWORT_EINFACH) {
  //       c.intervall = c.intervall * c.leichtigkeit * bonus * zufall;
  //       c.leichtigkeit += 0.15;
  //       c.fällig = Date.now() + c.intervall;
  //     } else return false
  //   } else if (c.rubrik == RUBRIK_ERNEUT_LERNEN) {
  //     if (antwort == ANTWORT_NOCHMAL) {
  //       c.stufe = 0;
  //       c.fällig = Date.now() + erneutLernenSchritte[0]
  //     } else if (antwort == ANTWORT_GUT) {
  //       if (c.stufe < erneutLernenSchritte.length - 1) {
  //         c.stufe++
  //         c.fällig = Date.now() + erneutLernenSchritte[c.stufe]
  //       } else {
  //         c.stufe = undefined;
  //         c.rubrik = RUBRIK_JUNG;
  //         if (c.leichtigkeit >= 1.50) {
  //           c.leichtigkeit -= 0.20
  //         } else { c.leichtigkeit = 1.30 }
  //         c.intervall = c.intervall * faktorNachErneutemLernen;
  //         c.fällig = Date.now() + c.intervall
  //       }
  //     } else if (antwort = ANTWORT_EINFACH) {
  //       c.rubrik = RUBRIK_JUNG
  //       if (c.leichtigkeit >= 1.35) {
  //         c.leichtigkeit -= 0.5
  //       } else { c.leichtigkeit = 1.30 }
  //       c.intervall = c.intervall * faktorNachErneutemLernen;
  //       c.fällig = Date.now() + c.intervall
  //     } else return false
  //   } else return false

  //   if (c.rubrik == RUBRIK_JUNG || c.rubrik == RUBRIK_ALT)
  //     //wenn intervall über einen monat ist wird die rubrik alt... hat nur einfluss auf eventuelle statistiken
  //     if (c.intervall >= 1000 * 60 * 60 * 24 * 30)
  //       c.rubrik = RUBRIK_ALT;
  //     else c.rubrik = RUBRIK_JUNG;

  //   if (c.gelernt)
  //     c.gelernt.push({ "zeit": Date.now(), "antwort": antwort })
  //   else c.gelernt = [{ "zeit": Date.now(), "antwort": antwort }]
  //   database.setUser(user, false)
  //   database.statusSpeichern(username);
  // }

}

