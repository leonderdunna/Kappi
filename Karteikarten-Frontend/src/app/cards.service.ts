import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Card } from './card.model';
import { User } from './user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient,
  private userService: UserService) {
    this.user = userService.getUser();
  
    this.http.get('http://localhost:3000/cards').subscribe(data=>{
      this.cards=data
    })
  
  }

  user: User;
  cards?: any;

  getCards(){
    return this.cards;
  }
 async addCard(card:any){
    await this.http.post<any>('http://localhost:3000/cards/public/public',{"card":card}).subscribe(data=>{console.log(data)})
    console.log(card)
  }

}
