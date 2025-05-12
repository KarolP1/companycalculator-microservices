import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { GlobalClientModule } from '@cc/common';

@Module({
  imports: [GlobalClientModule],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule { }
