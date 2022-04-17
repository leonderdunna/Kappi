import { Injectable } from '@angular/core';
import { CardsService } from './cards.service';
import { StatsService } from './stats.service';

@Injectable({
  providedIn: 'root'
})
export class GelerntService {

  constructor(
    private statService: StatsService,
    private cardService: CardsService
  ) { }

  getNeue(tag: number): number {
    return this.cardService.getCards().filter(
      (e) => {
        let stat = this.statService.getStatByCardID(e.id ?? '')
        if (!stat) return false;
        if (!stat.gelernt) return false;
        if (stat.gelernt.length > 1) return false
        if (
          (stat.gelernt[stat.gelernt.length - 1].zeit ?? 0)
          >= (Date.now() - ((tag + 1) * (1000 * 60 * 60 * 24))) &&
          (stat.gelernt[stat.gelernt.length - 1].zeit ?? 0)
          < (Date.now() - ((tag) * (1000 * 60 * 60 * 24)))
        ) return true
        return false
      }
    ).length
  }
}
