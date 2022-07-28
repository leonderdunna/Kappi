import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { User } from '../objekte/user.model';
import { server } from '../resources/server'

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) {
    this.user = JSON.parse(window.localStorage.getItem("user") ?? '{"name": "public",   "passwort": "public" } ')
  }

  user: User;
  passwortwurdegeändert: boolean = false;

  getUser(): User {
    //  return this.user
    if (this.user.name != "public") {
      this.verify(this.user).subscribe(data => {
        if (!data && !this.passwortwurdegeändert) {
          this.passwortwurdegeändert = true
          this.userSpeichern({ "name": "public", "passwort": "public" })

          alert("Ihr Passwort wurde auf einem anderen Gerät geändert. Bitte melden sie sich erneut an")

        }
      })

    }
    return this.user
  }

  userSpeichern(user: User): void {
    window.localStorage.setItem('user', JSON.stringify(user))
    this.user = user
  }

  changePasswort(p: string) {
    return this.http.put(server + 'user/', { user: this.user, neuesPasswort: p })
  }

  getAllUsers(): Observable<any> {
    return this.http.get(server + 'user');
  }
  verify(user: User): Observable<any> {
    return this.http.post(server + 'user/verify', { user: user });
  }

  addUser(user: User): Observable<any> {
    return this.http.post(server + 'user', { "user": user });
  }
  deleteAccount(user: User) {
    return this.http.post(server + 'user/delete', { user: user });
  }
}
