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
      this.cardsService.getCard(this.id).subscribe(card => {
        this.frage = card.frage;
        this.antwort = card.antwort;
        console.log("zu editierende karte (im konstruktoer)")
        console.log(card)
      })
    });
  }
  id = '';
  ngOnInit(): void {
  }
  frage: string = '';
  antwort: string = '';
  update(id: any) {

  }
}
