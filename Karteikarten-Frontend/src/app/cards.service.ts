import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';
import { UserService } from './user.service';

@Injectable({
  providedIn: 'root'
})
export class CardsService {

  constructor(private http: HttpClient,
    private userService: UserService) {
    this.user = userService.getUser();
  }

  user: User;

  async getCards(): Promise<any> {
    return await this.http.get('http://localhost:3000/cards')
  }

  getCard(id: any): Observable<any> {
    return this.http.get('http://localhost/cards/public/public/' + id)
  }

  async addCard(card: any) {
    await this.http.post<any>('http://localhost:3000/cards/public/public', { "card": card }).subscribe(data => { console.log(data) })
    console.log("neue karte bei addCard in cardsService:")
    console.log(card)
  }

}
