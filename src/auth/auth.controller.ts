import { Controller, Post, Body, Res } from '@nestjs/common';
import UsersService from 'src/users/users.service';
import AuthService from './auth.service';
import { Response } from 'express';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import CreateUserDto from 'src/users/dto/createUser.dto';
import LoginUserDto from './dto/login.dto';
import SignUpDto from './dto/signup.dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('signup')
  addUser(@Body() data: SignUpDto): Promise<{ accessToken: string }> {
    return this.authService.signUp(data);
  }

  @Post('login')
  async login(
    @Body() data: LoginUserDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<{ accessToken: string}>{
    const jwt = await this.authService.login(data );
    response.cookie('jwt', { httpOnly: true });
    return jwt;
  }
}
