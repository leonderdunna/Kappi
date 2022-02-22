import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/user.entity';
import { UserService } from 'src/user/user.service';
import { Package } from './package.entity';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';

@Module({
    imports:[TypeOrmModule.forFeature([Package]),TypeOrmModule.forFeature([User])],
    providers:[PackagesService,UserService],
    controllers:[PackagesController]
})
export class PackagesModule {}
