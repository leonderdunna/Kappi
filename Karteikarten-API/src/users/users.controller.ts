import { Body, Controller, Delete, Get, Post, Param, Put } from '@nestjs/common';
import { StatsService } from 'src/stats/stats.service';

import { UserService } from 'src/user/user.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UserService,private statsService:StatsService) { }

    @Get()
    getUsers(): Promise<string[]> {
        return this.userService.findAll()
    }

    @Get(':username/:password')
    testPassword(@Param() params): Promise<boolean> {
        return this.userService.testPassword(params.username, params.password)
    }

    @Post()
    addUser(@Body() body): Promise<boolean> {
        return this.userService.addUser(body.user.name, body.user.password)
    }
    @Delete(':username/:password')
    async deleteUser(@Param() params): Promise<boolean> {
        let test = await this.userService.testPassword(params.username, params.password)
        if (test) {
            this.userService.deleteUser(params.username)
            this.statsService.deleteByUser(params.username)
            return true
        }
        return false;
    }

    @Put(':username/:password/:newpasswort')
    async updateUser(@Param() params): Promise<boolean> {
        let test = await this.userService.testPassword(params.username, params.password)
        let id = await this.userService.getId(params.username)
        if (test) {
            this.userService.updateUser(id, params.newpasswort)
            return true
        }
        return false;
    }

}
