import { Controller, Get } from '@nestjs/common';
import { AuthMService } from './auth_m.service';

@Controller()
export class AuthMController {
  constructor(private readonly authMService: AuthMService) {}

  @Get()
  getHello(): string {
    return this.authMService.getHello();
  }
}
