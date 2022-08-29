import {Component, OnInit} from '@angular/core';
import {CardsService} from '../../services/cards.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Card} from '../../objekte/card/card.model';
import {ZusatzComponent} from "./zusatz/zusatz.component";
import {MatDialog} from '@angular/material/dialog';
import {Content} from "../../objekte/card/content.model";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private cardsService: CardsService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
  ) {
    this.route.params.subscribe(params => {

      this.card = this.cardsService.getCard(params['id']);

      this.original = this.card.content[this.card.content.length - 1]
      this.neu = {...this.card.content[this.card.content.length - 1]}

      for (let i = 1; i < this.card.paket.length; i++) {
        this.paket += ('::' + this.card.paket[i])
      }
      this.paketOriginal = this.paket

    })
  }

  card?: Card;

  ngOnInit(): void {
  }

  paket: string = '';
  original?: Content;
  neu?: Content;

  paketOriginal: string = ''

  update() {
    if ((this.frage == '' || this.antwort == '') && !ignoreWarnings) {
      alert('Weder Antwort noch Frage dürfen leer sein!')
      return;
    }
    if (!this.card) {
      console.error('Karte gibt es nicht');
      return;
    }
    this.card.frage = this.frage;
    this.card.antwort = this.antwort;
    this.card.paket = this.paket.split('::')
    this.paketOriginal = this.paket
    this.materialOriginal = this.material
    this.eingebenOriginal = this.eingeben
    this.card.eingeben = this.eingeben
    if (this.material != '')
      this.card.material = this.material
    else {
      this.card.material = undefined;
    }
    this.card.eingeben = this.eingeben;
    this.cardsService.updateCard(this.card)
  }

  reset() {
    if (!this.card) {
      console.error('Karte gibt es nicht');
      return;
    }
    this.frage = this.card.frage;
    this.antwort = this.card.antwort;
    this.paket = this.card.paket[0]
    this.material = this.materialOriginal
    for (let i = 1; i < this.card.paket.length; i++) {
      this.paket += ('::' + this.card.paket[i])
    }
  }

  removeAltAntwort(a: string) {
    this.card.alternativAntworten = this.card.alternativAntworten?.filter((i) => {
      if (i != a)
        return true;
      return false
    })
    this.cardsService.updateCard(this.card)
  }

  removeHFehler(f: string) {
    this.card.fehler = this.card.fehler?.filter((i) => {
      if (i.antwort != f)
        return true;
      return false
    })
    this.cardsService.updateCard(this.card)
  }

  openDialog() {
    let dialogRef = this.dialog.open(ZusatzComponent, {
      data: {
        card: this.card.id,
        alternative: ''
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      this.card = this.cardsService.getCard(this.id)
    })
  }

  entwurfSpeichern() {
    this.update(true)
    this.router.navigate(['neu'])
  }

  addCard() {
    this.card.entwurf = false
    this.update()
    this.router.navigate(['neu'])
  }

  abbrechen() {
    this.router.navigate(['neu'])
  }
}
