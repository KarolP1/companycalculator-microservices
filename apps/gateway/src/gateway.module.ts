import { Module } from '@nestjs/common';
import { GatewayController } from './gateway.controller';
import { GatewayService } from './gateway.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { GlobalClientModule } from '@cc/common';
import { UserModule } from './user/user.module';
import { MongoModule } from '@cc/mongo';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    MongoModule,
    GlobalClientModule,
    UserModule
  ],
  controllers: [GatewayController,],
  providers: [GatewayService],
})
export class GatewayModule { }
