import { Body, Controller, Delete, Get, Post, Param } from '@nestjs/common';

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
}
