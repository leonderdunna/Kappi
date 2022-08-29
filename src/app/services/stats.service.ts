import { Injectable } from '@angular/core';
import { Card } from '../objekte/card/card.model';
import { Stat } from '../objekte/stat.model';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor() {
  }
  STORAGE_STRINGS: { statIDs: string, stat: string, newIDPräfix: string } = {
    "statIDs": "statIDs",
    "stat": "stat",
    "newIDPräfix": "unSyncdStat"
  }

  getStats(): Stat[] {
    let statIDs: string[] = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.statIDs) ?? '[]');
    let stats: Stat[] = [];
    for (let statID of statIDs) {
      stats.push(this.getStat(statID));
    }
    return stats;
  }
  getStat(id: string): Stat {
    return JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.stat + id) ?? 'false')
  }
  getStatByCardID(id:string):Stat{
   return this.getStats().filter((e:Stat)=>{if(e.card == id)return true;return false})[0]

  }

  addStat(stat: Stat): string {
    stat.unsynced = true;
    stat.id = this.STORAGE_STRINGS.newIDPräfix + Math.random();
    window.localStorage.setItem(this.STORAGE_STRINGS.stat + stat.id, JSON.stringify(stat))
    let statList = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.statIDs) ?? '[]')
    statList.push(stat.id)
    window.localStorage.setItem(this.STORAGE_STRINGS.statIDs, JSON.stringify(statList))
    return stat.id;
  }
  delete(id: string): boolean {
    window.localStorage.removeItem(this.STORAGE_STRINGS.stat + id);
    let statList = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.statIDs) ?? '[]')
    statList = statList.filter((e: string) => e != id)

    window.localStorage.setItem(this.STORAGE_STRINGS.statIDs, JSON.stringify(statList));
    return true;

  }
  updateStat(stat: Stat): void {
    stat.lastChange = Date.now()
    window.localStorage.setItem(this.STORAGE_STRINGS.stat + stat.id, JSON.stringify(stat))

  }

}
