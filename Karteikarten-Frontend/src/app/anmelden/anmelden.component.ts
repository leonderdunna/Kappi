import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { Router, RouterLink } from '@angular/router';
import { User } from '../user.model';
import { UserService } from '../user.service';
import { RouterModule } from '@angular/router';



@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.scss']
})
export class AnmeldenComponent implements OnInit {

  constructor(private userService: UserService, private router: Router) { }
  allusers: string[] = [];

  anmeldenUsername = '';
  anmeldenPasswort = '';
  registrierenUsername = '';
  rpasswort = '';
  rnpasswort = '';

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => { this.allusers = data })

  }
  @Output() onSignin = new EventEmitter<boolean>()
  anmelden() {
    this.userService.testPassword({ name: this.anmeldenUsername, password: this.anmeldenPasswort }).subscribe(data => {
      if (data) {
        this.userService.userSpeichern({ name: this.anmeldenUsername, password: this.anmeldenPasswort })
        this.onSignin.emit(true)
      }
      else {
        this.anmeldenUsername = '';
        this.anmeldenPasswort = '';
        alert('Etwas hat nicht geklappt (Sind Benutzername und Passwort korrekt?). Bitte versuchen Sie es erneut')
      }
    })
  }

  registrieren() {
    if (!(this.allusers.indexOf(this.registrierenUsername) != -1) && this.registrierenUsername!='' && this.registrierenUsername != 'public' && this.rpasswort == this.rnpasswort && this.rpasswort != '') {
      this.userService.addUser({ name: this.registrierenUsername, password: this.rpasswort }).subscribe(data => {
        this.userService.userSpeichern({ name: this.registrierenUsername, password: this.rpasswort })
        this.onSignin.emit(true)
      })  }
      else {
        this. registrierenUsername = '';
        this.rpasswort = '';
        this.rnpasswort='';
        alert('Etwas hat nicht geklappt (Sind Benutzername und Passwort korrekt?). Bitte versuchen Sie es erneut')
      }


    }


}
