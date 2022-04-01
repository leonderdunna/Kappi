import { Injectable} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectID, Repository } from 'typeorm';
import { Cards } from 'src/cards/card.entity';


@Injectable()
export class CardsService {

    constructor(
        @InjectRepository(Cards)
        private readonly cardsRepository: Repository<Cards>,) { }

    async findAll(): Promise<Cards[]> {
        return this.cardsRepository.find();
    }
    async findOne(id: number): Promise<Cards> {
        return this.cardsRepository.findOne(id)
    }
    add(card: Cards): boolean {
        this.cardsRepository.insert(card)
        return true
    }
    deleteCard(id:ObjectID):void{
        this.cardsRepository.delete(id)
    }
    update(card:Cards):void{
        this.cardsRepository.update(card.id,card)
    }
}
