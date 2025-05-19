import { Controller, Post, Body, UnauthorizedException, Inject, Logger } from '@nestjs/common';
import { AuthMService } from './auth_m.service';
import { LoginDto } from 'apps/gateway/src/auth/dtos/login.dto';
import { MessagePattern } from '@nestjs/microservices';
import { getUserByAccessTokenMessagePattern, loginMessagePattern, signTokensMessagePattern } from '@cc/common';
import { User } from 'libs/common/src/entities';

@Controller('auth')
export class AuthMController {
  private readonly logger: Logger = new Logger(AuthMController.name)

  constructor(
    private readonly authService: AuthMService,
  ) { }

  @MessagePattern(loginMessagePattern)
  async login(@Body() body: LoginDto) {

    const user = await this.authService.validateUser(body.email, body.password);

    if (!user) {
      throw new UnauthorizedException('Invalid credentials');
    }
    return this.authService.login(user);
  }

  @MessagePattern(getUserByAccessTokenMessagePattern)
  async refreshToken(@Body() body: { refreshToken: string, }) {

    const decoded = this.authService.getUserFromToken(body.refreshToken);
    return decoded
  }

  @MessagePattern(signTokensMessagePattern)
  async signTokens(@Body() body: { user: User }) {

    return this.authService.login(body.user);
  }

}