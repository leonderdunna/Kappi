import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { User } from './user.model';
import { UserService } from './user.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StatsService {

  constructor(private http: HttpClient, private userService: UserService) {
    this.user = userService.getUser();
  }
  user: User;

  async getStats(): Promise<any> {
    return await this.http.get('http://localhost:3000/stats/' + this.user.name)
  }

  async addStatus(stat:any):Promise<any>{
    return await this.http.post('http://localhost:3000/stats/',{"stats":stat})
  }
  async removeStat(id:any):Promise<any>{
    return await this.http.delete('http://localhost:3000/stats/'+id)
  }
  async updateStat(id:any,stat:any):Promise<any>{
    return await this.http.put('http://localhost:3000/stats/'+id,{"stat":stat})
 
  }

}