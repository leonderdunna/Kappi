import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { ObjectID, Repository } from 'typeorm';
import { User } from './user.entity';

@Injectable()
export class UserService {
    constructor(

        @InjectRepository(User)
        private readonly userRepository: Repository<User>,
) { }
    async testPassword(username: string, password: string): Promise<boolean> {
        let u = await this.userRepository.findOne({ name: username })
        console.log(username)
        console.log(u)
        if (u)
            return (u.name == username && u.password == password)
        else { return false }

    }
    async findAll(): Promise<string[]> {
        let u = await this.userRepository.find()
        let unames = u.map((e) => { return e.name })
        return unames;
    }
    async addUser(username: string, password: string): Promise<boolean> {
        let u = await this.userRepository.find({ "name": username })
        if (u.length == 0) {
            this.userRepository.insert({ name: username, password: password })
            return true
        }
        return false
    }
    async deleteUser(username: string): Promise<boolean> {
        let success: boolean;
        let u = await this.userRepository.findOne({ "name": username })
        if (u) success = true;
        this.userRepository.delete(u.id)
        return success
    }
    async getId(username: string): Promise<ObjectID> {
        let u = await this.userRepository.findOne({ name: username })
        return u.id
    }
    async updateUser(id: ObjectID, password: string): Promise<any> {
        return this.userRepository.update(id, { password: password })
    }

    //  async getStats(username: string): Promise<Stats> {
    //      return await this.statsRepository.findOne({ "user": username })
    //  }

    //TODO: Abspeichern es status höchstwarscheinlich in einer separaten datenbank
    // async updateStats(user:string,card:ObjectID, stat:Stat):Promise<boolean>{
    //     this.statsRepository.update
    // }
}
