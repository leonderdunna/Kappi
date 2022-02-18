import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

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
  }

  angemeldet:boolean= false;
}
