import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Stats } from './stats.entity';
import { UserController } from './user.controller';
import { User } from './user.entity';
import { UserService } from './user.service';

@Module({
    imports:[TypeOrmModule.forFeature([User])],
    providers:[UserService],
    controllers:[UserController]
})
export class UserModule {}
