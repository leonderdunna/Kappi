import { Component, OnInit } from '@angular/core';
import { CardsService } from '../cards.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
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
    })
  }
  card:any ;
  id = '';
  ngOnInit(): void {
  }
  frage: string = '';
  antwort: string = '';
  update() {
    if(this.frage == '' || this.antwort ==''){
      alert('Weder Antwort noch Frage dürfen leer sein!')
      return;
    }
    this.card.frage=this.frage;
    this.card.antwort=this.antwort;
    this.cardsService.updateCard(this.card)
  }
  reset(){
    this.frage = this.card.frage;
    this.antwort = this.card.antwort;
  }
}
