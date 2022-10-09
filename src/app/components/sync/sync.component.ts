import {Component, OnInit} from '@angular/core';
import {AnkiService} from "../../services/sync/anki.service";
import {CardsService} from "../../services/cards.service";
import {Defaults} from "../../objekte/Defaults";

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

    await this.addToAnki();
    console.log("add anki-fertig")
    await this.syncToAnki();
    console.log("syncTo ANki-fertig")
    await this.addToKappi();

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

  async addToAnki() {
    let toAdd = (await this.ankiService.scan()).kartenFehlenInAnki
    for (let id of toAdd) {
      await this.ankiService.addFrage(this.cardsService.getCard(id.kappiId))
    }
  }
 async addToKappi() {

    let scanResults = await this.ankiService.scan()
    let toAdd = scanResults.kartenFehlenInKappi
    for (let infos of toAdd) {
      let card =this.cardsService.getCard( Defaults.card().id)
      let content = card.content[card.content.length-1]
      content.felder.frage = infos.frage;
      content.felder.antwort = infos.antwort;
      card.paket = infos.paket.split("::");
      content.entwurf = false;
      this.cardsService.updateCardContent(content,card.id)

    }

  }

  async syncToAnki() {

    let toSync = (await this.ankiService.scan()).newerInKappi
    for (let id of toSync) {

      await this.ankiService.updateAnkiCardByAnkiID(id.ankiId )
    }
  }
  async syncToKappi() {
    let toSync = (await this.ankiService.scan()).newerInAnki
    for (let id of toSync) {

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
      this.toSync = result.kartenFehlenInAnki;
      this.geaendert = result.newerInAnki;
      this.geaendert.push(...result.newerInKappi)
      this.kartenInKappi = result.kartenInKappi;
      this.kartenInAnki = result.kartenInAnki;
      this.laedt = false;
      this.connectionError = false;
      console.log(result)
    } catch (e) {
      this.laedt = false;
      this.connectionError = true;
      console.error(e)
      console.log("im catch block")
    }

  }

}
