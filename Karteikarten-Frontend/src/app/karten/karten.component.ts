import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-karten',
  templateUrl: './karten.component.html',
  styleUrls: ['./karten.component.scss']
})
export class KartenComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  displayedColumns:string[] = ["frage",'Bearbeiten','antwort']
  karten = [
    {
      frage: "Dies ist eine Tolle Beispielfrage lol wie hoch ist denn der Eifelturm",
      antwort: "antwort: nunja der Eifelturm ist ja schon echt hoch lol"
    }, {
      frage: "hallo",
      antwort: "antwort"
    }, {
      frage: "hallo",
      antwort: "antwort"
    }, {
      frage: "hallo",
      antwort: "antwort"
    }, {
      frage: "hallo",
      antwort: "antwort"
    }, {
      frage: "hallo",
      antwort: "antwort"
    }, {
      frage: "hallo",
      antwort: "antwort"
    }, {
      frage: "hallo",
      antwort: "antwort"
    }, {
      frage: "hallo",
      antwort: "antwort"
    },
  ]
}
