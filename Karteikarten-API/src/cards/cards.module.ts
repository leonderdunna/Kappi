import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { Cards } from './card.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
    imports:[TypeOrmModule.forFeature([Cards]),TypeOrmModule.forFeature([User])],
    providers:[CardsService,UserService],
    controllers:[CardsController]

})
export class CardsModule {}
