import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getSettings(){
    return { //TODO: müssen später aus dem backend gehohlt werden
       startLeichtigkeit: 2.5, // relative einheiten
       neueProTag: 10,
       lernenSchritte: [1000 * 60, 1000 * 60 * 10],
       startEinfach: 1000 * 60 * 60 * 24 * 4,
       startGut: 1000 * 60 * 60 * 24,
       minIntervall: 1000 * 60 * 60 * 24,
       maxIntervall: 1000 * 60 * 60 * 24 * 365 * 10,
       faktorErneut: 0.75,  //relative einheiten
       erneutSchritte: [1000 * 60 * 10]
     }
  }
  
}
