import { Controller, Get, Post, Body, Patch, Param, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { AuthGuard } from '@cc/common/auth-parts';
import { CreateUserDto } from 'libs/common/src/entities';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post("login")
  login(@Body() loginForm: LoginDto) {
    return this.authService.login(loginForm);
  }

  @Post("refresh")
  refreshToken(@Body() refreshTokenDto: { email: string, refreshToken: string }) {
    return this.authService.refreshToken(refreshTokenDto);
  }

  @Post("register")
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Delete("logout")
  async logoutAll(@Body() email: string) {
    return this.authService.logout(email);
  }



}
