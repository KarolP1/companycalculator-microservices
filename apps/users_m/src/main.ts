import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';

async function bootstrap() {

  const configService = new ConfigService();
  const port = configService.get('USERS_PORT') || 3000;
  const host = configService.get('USERS_HOST') || 'localhost';
  const logger = new Logger('Users');
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    UsersModule,
    {
      transport: Transport.TCP,
      options: {
        host: host,
        port: port,
      },
    },
  ).catch((err) => {
    logger.error('Error creating microservice', err);
    process.exit(1);
  }
  ).finally(() => {
    logger.log('Microservice created on ' + host + ':' + port);
  }
  )

  await app.listen().catch((err) => {
    logger.error('Error starting microservice', err);
    process.exit(1);
  }
  ).finally(() => {
    logger.log('Microservice is listening on ' + host + ':' + port);
  }
  );

}
bootstrap();
