import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthMService {
  getHello(): string {
    return 'Hello World!';
  }
}
