import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  constructor() { }

  title: string = 'KartenName'
  fach: string = 'Englisch'
  autor: string = 'Lena'
  id:number = 4
  frage: string = 'Wie groß ist der Eifelturm?'
  antwort: string = 'ca. 300m'

  zeigeAntwort:boolean = false

  antwortZeigen():void{
    this.zeigeAntwort = true;
  }

  rubrik: number = 1;

  ngOnInit(): void {
  }

}
