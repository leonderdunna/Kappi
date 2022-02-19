import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-lernen',
  templateUrl: './lernen.component.html',
  styleUrls: ['./lernen.component.scss']
})
export class LernenComponent implements OnInit {

  constructor() { }

frage='Wie hoch ist der Eifelturm?'
antwort='ca. 300m'
antwortSichtbar=false;
  ngOnInit(): void {
  }

}
