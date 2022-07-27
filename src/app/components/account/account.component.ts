import { Component, OnInit } from '@angular/core';
import { User } from '../../objekte/user.model';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.scss']
})
export class AccountComponent implements OnInit {

  
  constructor(private userService:UserService) {}

user?:User;
  allusers?:string[];
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data=>{this.allusers = data})
    this.user= this.userService.getUser()
  }
  changeUser(){
   this.user= this.userService.getUser()
  location.reload();
  }

}
