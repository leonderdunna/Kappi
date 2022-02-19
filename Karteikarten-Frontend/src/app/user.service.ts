import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    this.user = JSON.parse(window.localStorage.getItem("user") ?? '{"name": "public",   "password": "public" } ')
  }

  user: User;

  getUser(): User {
    return this.user
  }

  userSpeichern(user: User): void {
    window.localStorage.setItem('user', JSON.stringify(user))
    this.user = user
  }

  changePasswort(p:string){
    return this.http.put('http://localhost:3000/users/'+this.user.name+'/'+this.user.password+'/'+p,{})
  }

  getAllUsers(): Observable<any> {
    return this.http.get('http://localhost:3000/users')
  }
  testPassword(user: User): Observable<any> {
    return this.http.get('http://localhost:3000/users/' + user.name + '/' + user.password)
  }

  addUser(user: User): Observable<any> {
    return this.http.post('http://localhost:3000/users',
      { user: user })
  }
  deleteAccount(){
    return this.http.delete('http://localhost:3000/users/' + this.user.name + '/' + this.user.password)
  }
}
