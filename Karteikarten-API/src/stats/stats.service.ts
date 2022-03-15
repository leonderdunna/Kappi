import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Stats } from 'src/stats/stats.entity';
import { Repository } from 'typeorm';


@Injectable()
export class StatsService {

    constructor(
        @InjectRepository(Stats)
        private readonly statsRepository: Repository<Stats>,
    ) { }

    async getStatus(user: string): Promise<Stats[]> {
        
        return this.statsRepository.find({ user: user })
    }

    async addStats(user: string, card: string, status: any): Promise<boolean> {
        let u = await this.statsRepository.find({ "card": card, "user":user })
        if (u.length == 0) {
            this.statsRepository.insert(status) //TODO
            return true
        }
        return false
    }
    async deleteStats(user: string, card: string): Promise<boolean> {
        let success: boolean;
        let u = await this.statsRepository.findOne({ "user": user, "card": card })
        if (u) success = true;
        this.statsRepository.delete(u.id)
        return success
    }
    async updateStats(id: string, stat: any): Promise<any> {

        return this.statsRepository.update(id, stat)
    }
    async deleteByCard(card:any){
        this.statsRepository.delete({"card":card})
    }
    async deleteByUser(user:any){
        this.statsRepository.delete({"user":user})
    }
}
