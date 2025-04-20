import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class UsersService {
  logger = new Logger(UsersService.name);

  constructor() {

  }
  getHello(data: any) {
    this.logger.log(data);
    return data
  }
}
