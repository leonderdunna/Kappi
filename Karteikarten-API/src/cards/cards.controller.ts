import { Controller, Get, Post, Param, Body, Put, Delete } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import { Cards } from './card.entity';
import { CardsService } from './cards.service';

@Controller('cards')
export class CardsController {

    constructor(private cardsService: CardsService,
    private userService:UserService) { }

    @Get()
    getCards(): Promise<Cards[]> {
        return this.cardsService.findAll()
    }

    @Get(':id')
    getCard(@Param() params): Promise<Cards> {
        return this.cardsService.findOne(params.id)
    }

    @Post(':username/:password')
    addCard(@Body() body): void {
        console.log(body.card)
        this.cardsService.add(body.card)
    }

    @Put(':username/:password')
    update(@Body() body): void {
        this.cardsService.update(body.card)
    }

    @Delete(':username/:password/:id')
    deleteCard(@Param() params): void {
        this.cardsService.deleteCard(params.id)
    }

}
