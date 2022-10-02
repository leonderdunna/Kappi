import {Component, OnInit} from '@angular/core';
import {CardsService} from '../../services/cards.service';
import {ActivatedRoute, Router} from '@angular/router';
import {Card} from '../../objekte/card/card.model';
import {ZusatzComponent} from "./zusatz/zusatz.component";
import {MatDialog} from '@angular/material/dialog';
import {Content} from "../../objekte/card/content.model";
import {Defaults} from "../../objekte/Defaults";

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent {

  constructor(private cardsService: CardsService,
              private route: ActivatedRoute,
              private dialog: MatDialog,
              private router: Router,
  ) {
    this.route.params.subscribe(params => {


      this.card = this.cardsService.getCard(params['id']);

      console.log(this.card)

      this.original = this.card.content[this.card.content.length - 1]
      this.neu = {...this.card.content[this.card.content.length - 1]}

      for (let i = 1; i < this.card.paket.length; i++) {
        this.paket += ('::' + this.card.paket[i])
      }
      this.paketOriginal = this.paket

    })
  }

  card: Card = Defaults.card();


  paket: string = '';
  original: Content = Defaults.cardContent();
  neu: any;

  paketOriginal: string = ''

  update(entwurf: boolean) {



    this.neu.entwurf = entwurf;

    if ((this.neu?.felder.frage == '' || this.neu?.felder.antwort == '') && !this.neu?.entwurf) {
      alert('Weder Antwort noch Frage dürfen leer sein!')
      return;
    }

    this.cardsService.updateCardContent(this.neu, this.card.id,this.paket)

    if(this.original.entwurf)
    this.router.navigate(['neu'])
    else history.back();

  }

  reset() {
    this.neu = {...this.original}
  }

  removeAltAntwort(a
                     :
                     string
  ) {
    this.neu.felder.alternativAntworten = this.neu.felder.alternativAntworten?.filter((i: string) => {
      if (i != a)
        return true;
      return false
    })

  }

  removeHFehler(f
                  :
                  string
  ) {
    this.neu.felder.fehler = this.neu.felder.fehler?.filter((i: { antwort: string, fehler: string }) => {
      if (i.antwort != f)
        return true;
      return false
    })

  }

  openDialog() {
    let dialogRef = this.dialog.open(ZusatzComponent, {
      data: {
        card: this.card?.id,
        alternative: ''
      }
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (this.card)
        this.card = this.cardsService.getCard(this.card.id)
    })
  }


  abbrechen() {
    this.router.navigate(['neu'])
  }
}
