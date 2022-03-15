import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from 'src/stats/stats.entity';
import { StatsService } from 'src/stats/stats.service';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UsersController } from './users.controller';

@Module({
    imports:[TypeOrmModule.forFeature([User,Stats])],
    providers:[UserService,StatsService],
    controllers:[UsersController]
})
export class UsersModule {}
