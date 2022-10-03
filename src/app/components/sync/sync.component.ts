import {Component, OnInit} from '@angular/core';
import {AnkiService} from "../../services/sync/anki.service";
import {CardsService} from "../../services/cards.service";

@Component({
  selector: 'app-sync',
  templateUrl: './sync.component.html',
  styleUrls: ['./sync.component.scss']
})
export class SyncComponent {

  constructor(private ankiService: AnkiService, private cardsService: CardsService) {
    this.scan()
  }

 async fullSync() {
this.laedt = true;
   await this.add();
   await this.sync();
   await this.delete();
   await this.scan();
  }

  geloescht: any[] = [];
  laedt: boolean = true;
  toSync: any[] = [];
  geaendert: any[] = [];
  kartenInKappi: number = 0;
  kartenInAnki: number = 0;

  async add() {
    let toAdd = (await this.ankiService.scan()).kartenFehlen
    for (let id of toAdd) {
      await this.ankiService.addFrage(this.cardsService.getCard(id))
    }
  }

  async sync() {

    let toSync = (await this.ankiService.scan()).kartenZuAktualisieren
    for (let id of toSync) {
      await this.ankiService.updateAnkiCardByKappiID(id)
    }
  }

  async delete() {
    let toDelete = (await this.ankiService.scan()).gelöscht
    for (let id of toDelete) {
      console.log(id, this.cardsService.getCard(id),"soll gelöscht werden")
      await this.ankiService.deleteByKappiID(id)
    }
  }

  async scan() {
    this.laedt = true;
    let result = await this.ankiService.scan()
    console.log(result)
    this.geloescht = result.gelöscht;
    this.toSync = result.kartenFehlen;
    this.geaendert = result.kartenZuAktualisieren;
    this.kartenInKappi = result.kartenInKappi;
    this.kartenInAnki = result.kartenInAnki;
    this.laedt = false;
  }

}
