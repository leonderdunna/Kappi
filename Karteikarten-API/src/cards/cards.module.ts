import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from 'src/stats/stats.entity';
import { StatsService } from 'src/stats/stats.service';
import { User } from 'src/user/user.entity';
import { UserModule } from 'src/user/user.module';
import { UserService } from 'src/user/user.service';
import { Cards } from './card.entity';
import { CardsController } from './cards.controller';
import { CardsService } from './cards.service';

@Module({
    imports:[TypeOrmModule.forFeature([Cards]),TypeOrmModule.forFeature([User]),TypeOrmModule.forFeature([Stats])],
    providers:[CardsService,UserService,StatsService],
    controllers:[CardsController]

})
export class CardsModule {}
