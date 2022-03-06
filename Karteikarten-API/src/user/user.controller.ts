import { Controller, Get, Post, Param } from '@nestjs/common';
import { UserService } from './user.service';


@Controller('user/:username/:password')
export class UserController {

    constructor(private userService:UserService){}

 

    
}
