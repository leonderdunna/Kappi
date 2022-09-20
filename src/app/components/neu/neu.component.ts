import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { CardsService } from 'src/app/services/cards.service';
import {Defaults} from "../../objekte/Defaults";

@Component({
  selector: 'app-neu',
  templateUrl: './neu.component.html',
  styleUrls: ['./neu.component.scss']
})
export class NeuComponent implements OnInit {

  constructor(private cardsService:CardsService,private router:Router) {
    if(this.cardsService.getEntwürfe().length==0){
      this.neu()
    }
   }

  ngOnInit(): void {
  }


  entwuerfe=this.cardsService.getEntwürfe()

  delete(id:string){
    this.cardsService.delete(id)
    this.entwuerfe=this.cardsService.getEntwürfe()
  }
  edit(id:string){
    this.router.navigate([`edit/${id}`])
  }

neu(){
    console.error("ich glaube hier klappt was noch nicht. id wird gehohlt, aber die karte nicht hinzugefügt")
  this.router.navigate([`edit/${Defaults.card().id}`]) //TODO: das wird nicht funktionieren. die karte muss hinzugefügt werden.

}

}
