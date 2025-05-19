import { getUserByEmailMessagePattern, getUsersInRestaurantMessagePattern } from '@cc/common';
import { handleMicroserviceError } from '@cc/error-handler';
import { Inject, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy } from '@nestjs/microservices';
import { User } from 'libs/common/src/entities';
import { firstValueFrom } from 'rxjs';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AuthMService {
  constructor(
    private jwtService: JwtService,
    @Inject('USERS_SERVICE') private userClient: ClientProxy
  ) { }

  async validateUser(email: string, password: string): Promise<any> {

    const user = await firstValueFrom(
      this.userClient.send(getUserByEmailMessagePattern, { email })
    );

    if (!user || !user.passwordHash) {
      throw new Error('User not found');
    }
    const isMatch = await bcrypt.compare(password, user.passwordHash);
    return isMatch ? user : null;
  }

  async getUserFromToken(token: string) {
    const decoded = this.jwtService.verify(token);
    const user = await firstValueFrom(
      this.userClient.send(getUserByEmailMessagePattern, { email: decoded.email })
    );

    if (!user) {
      throw new Error('User not found');
    }
    return user;
  }

  async login(user: User) {
    const tokens = this.generateTokenPair(user);

    return tokens
  }

  async generateTokenPair(user: User) {
    const { passwordHash, ...rest } = user;
    const token = this.jwtService.sign(rest, {
      expiresIn: '1h',
    });
    const refreshToken = this.jwtService.sign({ sub: user._id }, {
      expiresIn: '7d',
    });
    return {
      access_token: token,
      refresh_token: refreshToken,
    }
  }



}