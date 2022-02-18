import { Body, Controller, Get, Param, Put,Post, Req } from '@nestjs/common';
import { Package } from 'src/packages/package.entity';
import { PackagesService } from './packages.service';

@Controller('packages/:username/:password') //TODO Passwort überprüfen
export class PackagesController {
     constructor(private packageService:PackagesService ){}
    @Get()
    findAll(@Param() params): Promise<Package[]> {
        return this.packageService.findAll() 
    }

    @Get(':id')
    findPackage(@Param() params): Promise<Package> {
        return this.packageService.findOne(params.id)
    }
    @Post()
    addPackage(@Param() params, @Body() body):void{
        this.packageService.add(body.package)
    }
    @Put()
    updatePackage(@Param() params, @Body() body):void{
        this.packageService.update(body.package)
    }
}
