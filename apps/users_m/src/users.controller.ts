import { Controller, Get } from '@nestjs/common';
import { UsersService } from './users.service';
import { MessagePattern } from '@nestjs/microservices';
import { testMessagePattern } from '@cc/common';

@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) { }

  @MessagePattern(testMessagePattern)
  getHello(data: { text: string }): string {
    return this.usersService.getHello(data.text)
  }
}
