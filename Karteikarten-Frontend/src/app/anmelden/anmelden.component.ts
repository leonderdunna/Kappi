import { Component, OnInit } from '@angular/core';
import { User } from '../user.model';
import { UserService } from '../user.service';

@Component({
  selector: 'app-anmelden',
  templateUrl: './anmelden.component.html',
  styleUrls: ['./anmelden.component.scss']
})
export class AnmeldenComponent implements OnInit {

  constructor(private userService:UserService) { }
allusers:string[] = [] ;

  anmeldenUsername= '';
  ngOnInit(): void {
    this.userService.getAllUsers().subscribe(data=>{this.allusers = data})
  
  }

}
