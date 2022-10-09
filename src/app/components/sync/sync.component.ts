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

    console.log("fullsync")

    await this.add();
    console.log("add-fertig")
    await this.syncToAnki();
    console.log("syncTo ANki-fertig")

   await this.syncToKappi();
    console.log("syncTo Kappi-fertig")
    await this.delete();
    console.log("delete-fertig")
    await this.scan();
    console.log("scan-fertig")
  }

  connectionError:boolean = false;
  geloescht: any[] = [];
  laedt: boolean = true;
  toSync: any[] = [];
  geaendert: any[] = [];
  kartenInKappi: number = 0;
  kartenInAnki: number = 0;

  async add() {
    let toAdd = (await this.ankiService.scan()).kartenFehlen
    for (let id of toAdd) {
      await this.ankiService.addFrage(this.cardsService.getCard(id.kappiId))
    }
  }

  async syncToAnki() {

    let toSync = (await this.ankiService.scan()).newerInKappi
    for (let id of toSync) {
      console.log(id, "soll aktualisiert werden")
      await this.ankiService.updateAnkiCardByAnkiID(id.ankiId )
    }
  }
  async syncToKappi() {
    let toSync = (await this.ankiService.scan()).newerInAnki
    for (let id of toSync) {
      console.log(id, "soll aktualisiert werden")
      await this.ankiService.updateKappiCardByAnkiID(id.ankiId)
    }
  }

  async delete() {
    let toDelete = (await this.ankiService.scan()).gelöscht
    for (let id of toDelete) {
      console.log(id, this.cardsService.getCard(id.ankiId.toString()), "soll gelöscht werden")
      await this.ankiService.deleteByAnkiID(id.ankiId.toString())
    }
  }

  async scan() {
    this.laedt = true;
    try {
      let result = await this.ankiService.scan()
      this.geloescht = result.gelöscht;
      this.toSync = result.kartenFehlen;
      this.geaendert = result.newerInAnki;
      this.geaendert.push(...result.newerInKappi)
      this.kartenInKappi = result.kartenInKappi;
      this.kartenInAnki = result.kartenInAnki;
      this.laedt = false;
      this.connectionError = false;
    } catch (e) {
      this.laedt = false;
      this.connectionError = true;
      console.error(e)
      console.log("im catch block")
    }

  }

}
