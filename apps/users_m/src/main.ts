import { NestFactory } from '@nestjs/core';
import { UsersModule } from './users.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { ConfigService } from '@nestjs/config';
import { Logger } from '@nestjs/common';
import { AllExceptionsFilter } from '@cc/error-handler/all-exceptions.filter';

async function bootstrap() {
  const logger = new Logger('Users');

  try {
    const app = await NestFactory.createMicroservice<MicroserviceOptions>(UsersModule, {
      transport: Transport.TCP,
      options: {
        host: process.env.USERS_HOST || 'localhost', // Ładowanie hosta z env lub domyślnie 'localhost'
        port: Number(process.env.USERS_PORT) || 3000, // Port z env lub domyślnie 3000
      },
    });

    app.useGlobalFilters(new AllExceptionsFilter("UsersMicroserviceError"));

    const configService = app.get(ConfigService);
    const host = configService.get('USERS_HOST', 'localhost');
    const port = configService.get('USERS_PORT', 3000);

    // Wysłanie komunikatu o uruchomieniu mikroserwisu
    logger.log(`Microservice created on ${host}:${port}`);

    // Rozpoczęcie nasłuchiwania mikroserwisu
    await app.listen();
    logger.log(`Microservice is listening on ${host}:${port}`);

  } catch (err) {
    logger.error('Error starting microservice', err);
    process.exit(1);
  }
}
bootstrap();
