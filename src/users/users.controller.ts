import {
    Controller,
    Post,
    Body,
    Get,
    Param,
    Patch,
    Delete,
    Query,
    Put,
  } from '@nestjs/common';
import UsersService from './users.service';
import CreateUserDto from './dto/createUser.dto';
import {  ApiTags } from '@nestjs/swagger';
  
  @ApiTags('users')
  @Controller('users')
  export class UsersController {
    constructor(private readonly usersService: UsersService) {}
  
    @Get()
    getPage(@Query('limit') limit: number,
    @Query('page') page: number){
      return this.usersService.getPage(limit, page)
    }
    
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
  
    @Put(':id')
    updateUser(
      @Param('id') userId: string,
      @Body() user: CreateUserDto
    ) {
      return this.usersService.update(userId, user);
    }
  
    @Delete(':id')
    removeUser(@Param('id') userId: string) {
      return this.usersService.delete(userId);
    }
  }