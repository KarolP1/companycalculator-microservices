import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { ClientProxy } from '@nestjs/microservices';
import { createUserMessagePattern, getUserByAccessTokenMessagePattern, loginMessagePattern, signTokensMessagePattern } from '@cc/common';
import { RedisConnectionService } from '@cc/redis';
import { firstValueFrom } from 'rxjs';
import { RefreshTokenDto } from './dtos/RefreshToken.dto';
import { CreateUserDto, User } from 'libs/common/src/entities';

@Injectable()
export class AuthService {
  constructor(
    @Inject('USERS_SERVICE') private userClient: ClientProxy,
    @Inject('AUTH_SERVICE') private authClient: ClientProxy,
    private readonly redisService: RedisConnectionService
  ) { }

  async login(createAuthDto: LoginDto,
  ) {
    const tokens = await firstValueFrom(
      this.authClient.send(loginMessagePattern, createAuthDto)
    )
    // decode the tokens


    this.redisService.set(
      `user:${createAuthDto.email}`,
      tokens.refresh_token,
    )
    this.redisService.expire(
      `user:${createAuthDto.email}`,
      60 * 60 * 24 * 7
    )
    return tokens
  }

  async refreshToken(dto: RefreshTokenDto) {
    const stored = await this.redisService.get(`user:${dto.email}`);


    const decoded = await firstValueFrom(
      this.authClient.send(getUserByAccessTokenMessagePattern, { refreshToken: dto.refreshToken })
    ) as User


    await this.redisService.set(`user:${decoded.email}`, dto.refreshToken);
    await this.redisService.expire(`user:${decoded.email}`, 60 * 60 * 24 * 7);

    const tokens = await firstValueFrom(
      this.authClient.send(signTokensMessagePattern, { user: decoded })
    )
    return tokens;

  }

  async logout(email: string) {
    await this.redisService.del(`user:${email}`);
    return { message: 'Logged out' };
  }

  async register(createUserDto: CreateUserDto) {
    return await firstValueFrom(this.userClient.send(createUserMessagePattern, createUserDto));
  }


}
