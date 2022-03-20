import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { Observable } from 'rxjs';
import {server} from './server'

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient, private userService: UserService) {
    this.user = userService.getUser();
  }
  user: User;

  async getStats(): Promise<any> {
    return await this.http.get(server+'stats/' + this.user.name)
  }

  async addStatus(stat:any):Promise<any>{
    return await this.http.post(server+'stats/',{"stats":stat})
  }
  async removeStat(id:any):Promise<any>{
    return await this.http.delete(server+'stats/'+id)
  }
  async updateStat(id:any,stat:any):Promise<any>{
    return await this.http.put(server+'stats/'+id,{"stat":stat})
 
  }

}