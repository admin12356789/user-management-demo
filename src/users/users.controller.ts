import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Delete,
  Put,
  UseGuards,
} from '@nestjs/common';
import UsersService from './users.service';
import CreateUserDto from './dto/createUser.dto';
import { ApiTags, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from '@nestjs/passport';

@ApiTags('users')
@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  // @Get()
  // getPage(@Query('limit') limit: number,
  // @Query('page') page: number){
  //   return this.usersService.getPage(limit, page)
  // }

  @Get('all')
  getAll() {
    return this.usersService.getAll();
  }

  @Post()
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  addUser(@Body() user: CreateUserDto) {
    const generatedId = this.usersService.create(user);
    return { id: generatedId };
  }

  @Get(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  getUser(@Param('id') userId: string) {
    return this.usersService.getById(userId);
  }

  @Put(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  updateUser(@Param('id') userId: string, @Body() user: CreateUserDto) {
    return this.usersService.update(userId, user);
  }

  @Delete(':id')
  @ApiBearerAuth('JWT')
  @UseGuards(AuthGuard())
  removeUser(@Param('id') userId: string) {
    return this.usersService.delete(userId);
  }
}
