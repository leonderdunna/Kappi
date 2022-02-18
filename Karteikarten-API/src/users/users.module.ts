import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { UsersController } from './users.controller';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UserService],
    controllers:[UsersController]
})
export class UsersModule {}
