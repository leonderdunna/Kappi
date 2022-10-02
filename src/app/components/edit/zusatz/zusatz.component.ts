import {Component, Inject, OnInit} from '@angular/core';
import {CardsService} from "../../../services/cards.service";
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material/dialog";


@Component({
  selector: 'add-alternative-dialog',
  templateUrl: 'alternative-dialog.html',
  styleUrls: ['dialog.scss']
})
export class ZusatzComponent {
  constructor(private cardsService: CardsService,
              public dialogRef: MatDialogRef<ZusatzComponent>,
              @Inject(MAT_DIALOG_DATA)
              public data: { card: string, alternative: string },
  ) {

  }
  hinweis: string = '';
  falsch: boolean = false;
  add() {
    let card = this.cardsService.getCard(this.data.card)
    if (this.falsch) {
      if (!(this.hinweis != '' && this.data.alternative != '')) { alert('Bitte geben Sie alle nötigen Informationen an'); return }
      if (card.content[card.content.length-1].felder.fehler) {
        for(let f of card.content[card.content.length-1].felder.fehler??[]){
          if(f.antwort == this.data.alternative){ alert('Diese Antwort existiert schon'); return }
        }
        card.content[card.content.length-1].felder.fehler?.push({ hinweis: this.hinweis, antwort: this.data.alternative })
      } else {
        card.content[card.content.length-1].felder.fehler = [{ hinweis: this.hinweis, antwort: this.data.alternative }]
      }

    } else {
      if (!(this.data.alternative != '')) { alert('Bitte geben Sie alle nötigen Informationen an'); return }
      if (card.content[card.content.length-1].felder.alternativAntworten) {
        for(let f of card.content[card.content.length-1].felder.alternativAntworten??[]){
          if(f == this.data.alternative){ alert('Diese Antwort existiert schon'); return }
        }
        card.content[card.content.length-1].felder.alternativAntworten?.push(this.data.alternative)
      }
      else {
        card.content[card.content.length-1].felder.alternativAntworten = [this.data.alternative]
      }

    }
    this.cardsService.updateCard(card)
    this.dialogRef.close(true)
  }
}