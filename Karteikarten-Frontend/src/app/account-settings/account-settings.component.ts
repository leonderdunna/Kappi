import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-account-settings',
  templateUrl: './account-settings.component.html',
  styleUrls: ['./account-settings.component.scss']
})
export class AccountSettingsComponent implements OnInit {

  constructor(private userService:UserService) {  }
user?:User;
  ngOnInit(): void {
  this.user =this.userService.getUser()
   
  }

}
