import { Module } from '@nestjs/common';
import { AuthMController } from './auth_m.controller';
import { AuthMService } from './auth_m.service';

@Module({
  imports: [],
  controllers: [AuthMController],
  providers: [AuthMService],
})
export class AuthMModule {}
