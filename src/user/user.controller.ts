import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Request,
} from '@nestjs/common';
import { UserService } from './user.service';

import { Post, UseGuards } from '@nestjs/common/decorators';

@Controller('user')
export class UserController {
  constructor(private userService: UserService) {}

  @Post('/userdetails')
  async getuser(@Body() body: any) {
    return await this.userService.usedetails(body.id);
  }

  @Get('/')
  getAllUsers(@Request() req) {
    return this.userService.getAllUsers();
  }


  @Post('/delete')
  async deleteUser(@Body() body: any) {
    return await this.userService.deleteUser(body.id);
  }

  @Post('/updateuser')
  async updateuser(@Body() body: any) {
    return await this.userService.editProfile(body.name,body.email,body.id);
  }

  @Post('/createuser')
  async createuser(@Body() body: any) {
    
    return await this.userService.createuser(body.name , body.email,body.password);
  }
}
