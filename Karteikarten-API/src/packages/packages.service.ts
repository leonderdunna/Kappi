import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Package } from './package.entity';

@Injectable()
export class PackagesService {
    constructor(@InjectRepository(Package) private packagesRepository: Repository<Package>,) { }

    async findAll(): Promise<Package[]> {
        return this.packagesRepository.find();
    }

    async findOne(id: number): Promise<Package> {
        return this.packagesRepository.findOne(id)
    }

    add(pack: Package): void {
        this.packagesRepository.insert(pack)
    }

    update(pack: Package): void {
        this.packagesRepository.update(pack.id, pack)
    }

}
