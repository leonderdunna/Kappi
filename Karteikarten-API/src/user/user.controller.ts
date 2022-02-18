import { Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user/:username/:password')
export class UserController {

    constructor(private userService:UserService){}

    //Settings
    @Get('settings')
    getSettings(@Param() params): {}[] {
        return [] //TODO
    }
    @Get('settings/:time')
    getNewSettings(@Param() params): {}[] {
        return [] //TODO
    }
    @Post('settings')
    setSettings(@Param() params): void {
        //TODO
    }
    @Post('settings/:property')
    addSetting(@Param() params): void {
        //TODO
    }

    //stats

    @Get('stats')
    getStats(@Param() params): {}[] {
        return []; //TODO
    }
    @Get('stats/:time')
    getNewStats(@Param() params): {}[] {
        return [] //TODO
    }
    @Post('stats')
    setStats(@Param() parrams): void {
        //TODO
    }
    @Post('stats/:id')
    setStat(@Param() params): void {
        //TODO
    }
}
