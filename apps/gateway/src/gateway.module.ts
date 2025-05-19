import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GlobalClientModule } from '@cc/common';
import { UserModule } from './user/user.module';
import { MongoModule } from '@cc/mongo';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    GlobalClientModule,
    UserModule,
    AuthModule
  ],
  controllers: [],
  providers: [],
})
export class GatewayModule { }
