import { Module } from '@nestjs/common';
import { AuthMService } from './auth_m.service';
import { AuthMController } from './auth_m.controller';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './strategies/jwt.strategy';
import { ConfigModule } from '@nestjs/config';
import { GlobalClientModule } from '@cc/common';
import { RedisConnectionModule } from '@cc/redis';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    PassportModule,
    RedisConnectionModule,
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secretKey',
      signOptions: { expiresIn: '1d' },
    }),
    GlobalClientModule
  ],
  controllers: [AuthMController],
  providers: [AuthMService, JwtStrategy],
})

export class AuthMModule { }