import { Body, Controller, Get, Param, Put, Post, Req } from '@nestjs/common';
import { Package } from 'src/packages/package.entity';
import { UserService } from 'src/user/user.service';
import { PackagesService } from './packages.service';

@Controller('packages/:username/:password') //TODO Passwort überprüfen
export class PackagesController {
    constructor(private packageService: PackagesService, private userService: UserService) { }
    @Get()
    async findAll(@Param() params): Promise<Package[]> {
        if (!await this.userService.testPassword(params.username, params.password)) return [];
        let packs: Package[] = await this.packageService.findAll()

        packs = packs.filter((e) => {
            if (e.user.indexOf(params.username) != -1) return true; return false;
        })
        return packs

    }

    @Get(':id')
    async findPackage(@Param() params): Promise<Package> {
        if (!await this.userService.testPassword(params.username, params.password)) return null;
        let pack: Package = await this.packageService.findOne(params.id)
        if (pack.user.indexOf(params.username) != -1)
            return pack;
        return null;
    }
    @Post()
    async addPackage(@Param() params, @Body() body): Promise<any> {
        if (!await this.userService.testPassword(params.username, params.password)) return;
        this.packageService.add(body.package)
    }
    @Put()
    async updatePackage(@Param() params, @Body() body): Promise<any> {
        if (!await this.userService.testPassword(params.username, params.password)) return;

        let pack: Package = await this.packageService.findOne(body.package.id)
        if (pack.user.indexOf(params.username) != -1)
            this.packageService.update(body.package)
    }
}
