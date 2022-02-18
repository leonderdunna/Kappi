import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Package } from './package.entity';
import { PackagesController } from './packages.controller';
import { PackagesService } from './packages.service';

@Module({
    imports:[TypeOrmModule.forFeature([Package])],
    providers:[PackagesService],
    controllers:[PackagesController]
})
export class PackagesModule {}
