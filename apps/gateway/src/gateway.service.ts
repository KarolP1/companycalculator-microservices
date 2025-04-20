import { testMessagePattern } from '@cc/common';
import { Inject, Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class GatewayService {
  constructor(@Inject('USERS_SERVICE') private client: ClientProxy,) {

  }

  getHello() {
    return this.client.send(testMessagePattern, { text: 'working succesfully!' });
  }

}
