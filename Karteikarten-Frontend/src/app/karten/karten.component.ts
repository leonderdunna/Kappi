import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from '../cards.service';

@Component({
  selector: 'app-karten',
  templateUrl: './karten.component.html',
  styleUrls: ['./karten.component.scss']
})
export class KartenComponent implements OnInit {


  constructor(private cardsService:CardsService, private router:Router) {
    this.cardsService.getCards().then(data =>{this.karten = data})
   }

 
  ngOnInit(): void {
  }
  edit(id:any){
    console.log("karte deren editor geöffnet wird ( edit() )")
    console.log(id)
    this.router.navigate([`edit/${id}`]);
  }

  displayedColumns:string[] = ["frage",'Bearbeiten','antwort']
  karten =  []
}
