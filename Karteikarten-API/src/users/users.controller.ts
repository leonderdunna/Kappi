import { Body, Controller, Delete, Get, Post, Param, Put } from '@nestjs/common';
import { User } from 'src/user/user.entity';

import { UserService } from 'src/user/user.service';

@Controller('users')
export class UsersController {

    constructor(private userService: UserService) { }

    @Get()
    getUsers(): Promise<string[]> {
        return this.userService.findAll()
    }
    @Post()
    addUser(@Body() body): Promise<boolean> {
        return this.userService.addUser(body.user.name, body.user.password)
    }
    @Delete(':username/:password')
    async deleteUser(@Param() params): Promise<boolean> {
        let test = await this.userService.testPassword(params.username,params.password)
        if(test){
         return   this.userService.deleteUser(params.username)
        }
        return false;
    }

    @Put(':username/:password/:newpasswort')
    async updateUser(@Param() params):Promise<boolean>{
        let test = await this.userService.testPassword(params.username,params.password)
        let id = await this.userService.getId(params.username)
        if(test){
            this.userService.updateUser(id,params.newpasswort)
         return   true
        }
        return false;
    }

}
