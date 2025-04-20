import { NestFactory } from '@nestjs/core';
import { GatewayModule } from './gateway.module';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const logger = new Logger('Gateway');

  const configService = new ConfigService();
  const port = configService.get('GATEWAY_PORT') || 3001;
  const app = await NestFactory.create(GatewayModule);
  await app.listen(port).catch((err) => {
    logger.error('Error starting HTTP server', err);
    process.exit(1);
  }
  ).finally(() => {
    logger.log('HTTP server started on port ' + port);
  })

}
bootstrap();
