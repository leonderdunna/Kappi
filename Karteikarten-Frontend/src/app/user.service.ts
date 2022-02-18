import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from './user.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  user?:User;

  constructor(private http:HttpClient) { }

  getUser():User|undefined{
    return this.user
  }

  getAllUsers():Observable<any>{
    return this.http.get('http://localhost:3000/users')
  }

}
