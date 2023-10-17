import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
  } from '@nestjs/common';
import UsersService from './users.service';
import CreateUserDto from './dto/createUser.dto';
  
  
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Post()
    addUser(
      @Body() user: CreateUserDto,
    ) {
      const generatedId = this.usersService.create(
       user
      );
      return { id: generatedId };
    }
  
    // @Get()
    // getAllUsers() {
    //   return this.usersService.();
    // }
  
    @Get(':id')
    getUser(@Param('id') userId: string) {
      return this.usersService.getById(userId);
    }
  
    // @Patch(':id')
    // updateUser(
    //   @Param('id') userId: string,
    //   @Body('title') prodTitle: string,
    //   @Body('description') prodDesc: string,
    //   @Body('price') prodPrice: number,
    // ) {
    //   this.usersService.updateUser(userId, prodTitle, prodDesc, prodPrice);
    //   return null;
    // }
  
    @Delete(':id')
    removeUser(@Param('id') userId: string) {
        this.usersService.delete(userId);
        return null;
    }
  }