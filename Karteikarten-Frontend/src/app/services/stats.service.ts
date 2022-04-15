import { Injectable } from '@angular/core';

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

  getStats(): any[] {
    let statIDs: string[] = JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.statIDs) ?? '[]');
    let stats: any[] = [];
    for (let statID of statIDs) {
      stats.push(this.getStat(statID));
    }
    return stats;
  }
  getStat(id: string): any {
    return JSON.parse(window.localStorage.getItem(this.STORAGE_STRINGS.stat + id) ?? 'false')
  }

  addStat(stat: any): string {
    stat.new = true;
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
  updateStat(stat: any): void {
    stat.lastChange = Date.now()
    window.localStorage.setItem(this.STORAGE_STRINGS.stat + stat.id, JSON.stringify(stat))

  }

}