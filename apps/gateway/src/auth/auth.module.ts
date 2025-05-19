import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { GlobalClientModule } from '@cc/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { RedisConnectionModule } from '@cc/redis';
import { AuthGuard } from '@nestjs/passport';
import { ClientsModule, Transport } from '@nestjs/microservices';


@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    RedisConnectionModule,
    GlobalClientModule,
  ],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule { }

