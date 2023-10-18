import { Controller, Post, Body, Request, Res } from '@nestjs/common';
import AuthService from './auth.service';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';
import LoginUserDto from './dto/login.dto';
import SignUpDto from './dto/signup.dto';
import { Request } from 'supertest';

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
  ): Promise<{ accessToken: string }> {
    const jwt = await this.authService.login(data);
    response.cookie('jwt', { httpOnly: true });
    return jwt;
  }

  @Post('refresh')
  async refresh(@Request() request : Request): Promise<{ accessToken: string }> {
    return this.authService.refreshToken(request.);
  }
}
