import { Component, OnInit } from '@angular/core';
import { CardsService } from '../services/cards.service';
import { ActivatedRoute } from '@angular/router';
import { Card } from '../objekte/card.model';
@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

  constructor(private cardsService: CardsService,
    private route: ActivatedRoute,
  ) {
    this.route.params.subscribe(params => {
      this.id = params['id'];
      this.card = this.cardsService.getCard(this.id);
      this.frage = this.card.frage;
      this.antwort = this.card.antwort;
      this.paket = this.card.paket[0]
      for (let i = 1; i < this.card.paket.length; i++) {
        this.paket += ('::' + this.card.paket[i])
      }
      this.paketOriginal = this.paket
      if (this.card.material) {
        this.material = this.card.material
        this.materialOriginal = this.material
      }
    })
  }
  card: Card = { frage: '', antwort: '', paket: [] };
  id = '';
  ngOnInit(): void {
  }
  frage: string = '';
  antwort: string = '';
  paket: string = '';
  material: string = ''
  materialOriginal: string = '';
  paketOriginal: string = ''
  update() {
    if (this.frage == '' || this.antwort == '') {
      alert('Weder Antwort noch Frage dürfen leer sein!')
      return;
    }
    if (!this.card) { console.error('Karte gibt es nicht'); return; }
    this.card.frage = this.frage;
    this.card.antwort = this.antwort;
    this.card.paket = this.paket.split('::')
    this.paketOriginal = this.paket
    this.materialOriginal = this.material
    if (this.material != '')
      this.card.material = this.material
    else {
      this.card.material = undefined;
    }
    this.cardsService.updateCard(this.card)
  }
  reset() {
    if (!this.card) { console.error('Karte gibt es nicht'); return; }
    this.frage = this.card.frage;
    this.antwort = this.card.antwort;
    this.paket = this.card.paket[0]
    this.material = this.materialOriginal
    for (let i = 1; i < this.card.paket.length; i++) {
      this.paket += ('::' + this.card.paket[i])
    }
  }
}
