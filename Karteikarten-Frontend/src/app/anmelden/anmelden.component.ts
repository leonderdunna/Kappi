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
 
  constructor(private userService: UserService,private router :Router) { }
  allusers: string[] = [];

  anmeldenUsername = '';
  anmeldenPasswort = '';
  registrierenUsername = '';

  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data => { this.allusers = data })

  }
  @Output() onSignin = new EventEmitter<boolean>()
  anmelden(){
    this.userService.testPassword({name:this.anmeldenUsername,password:this.anmeldenPasswort}).subscribe(data =>{
      if(data){
        this.userService.userSpeichern({name:this.anmeldenUsername,password:this.anmeldenPasswort})
        this.onSignin.emit(true)
      }
      console.log(data)
    })
  }

}
