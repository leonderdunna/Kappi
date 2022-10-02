
import {Injectable} from '@angular/core';
import {CardsService} from './cards.service';


@Injectable({
  providedIn: 'root'
})
/**
 * Methoden die angeben, wie viele Karten bisher gelernt wurden
 * @param cardService Quelle der Informationen
 */
export class GelerntService {
  constructor(
    private cardService: CardsService
  ) {
  }

  /**
   * @return Gibt die Anzahl der Zu 'tag' gelernten **vorher neuen** Karten zurück
   *
   * @param tag 0 entspricht den letzten 24 Stunden;
   * @param tag 1 -> zwischen 24 und 48 Stunden;
   * @param tag exakt 24 Stunden zählt zu tag 0;
   *
   */
  getNeue(tag: number): number {

    if (tag < 0) {
      console.error("Tag darf nicht kleiner als 0 sein: Negative Werte sind Daten in der Zukunft ;)");
      return 0;
    }

    return this.cardService.getCards().filter(
      (e) => {

        if (e.stat.length === 0) return false;

        if (e.stat[e.stat.length - 1].gelernt == undefined) return false

        // Wenn die Karte bereits vorher nicht mehr neu war, zählt sie nicht
        if (e.stat.length > 1)
          if (e.stat[e.stat.length - 2].rubrik != 0) return false

        return (e.stat[e.stat.length - 1].gelernt?.zeit ?? 0)
          >= (Date.now() - ((tag + 1) * (1000 * 60 * 60 * 24))) &&
          (e.stat[e.stat.length - 1].gelernt?.zeit ?? 0)
          < (Date.now() - ((tag) * (1000 * 60 * 60 * 24)));

      }
    ).length
  }
}
