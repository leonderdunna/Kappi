import { Injectable } from '@angular/core';
import { Settings } from '../objekte/settings.model';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {

  constructor() { }

  getSettings():Settings {
    let settings: Settings |false = JSON.parse(window.localStorage.getItem("einstellungen") ?? 'false')
    if (settings == false)
      return { //standardeinstellungen
        startLeichtigkeit: 2.5, // relative einheiten
        neueProTag: 10,
        kartenProTag:100,
        lernenSchritte: [1000 * 60, 1000 * 60 * 10],
        startEinfach: 1000 * 60 * 60 * 24 * 4,
        startGut: 1000 * 60 * 60 * 24,
        minIntervall: 1000 * 60 * 60 * 24,
        maxIntervall: 1000 * 60 * 60 * 24 * 365 * 10,
        faktorNachErneutemLernen: 0.75,  //relative einheiten
        erneutLernenSchritte: [1000 * 60 * 10],
        bonus:1.3,
      }
    return settings
  }
  update(settings:Settings):void {
    window.localStorage.setItem('einstellungen',JSON.stringify(settings))
  }
}
