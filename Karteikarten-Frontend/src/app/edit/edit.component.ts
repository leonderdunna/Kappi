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
      let card = this.cardsService.getCard(this.id);
      this.frage = card.frage;
      this.antwort = card.antwort;
    })
  }

  id = '';
  ngOnInit(): void {
  }
  frage: string = '';
  antwort: string = '';
  update(id: any) {

  }
}
