import { NestFactory } from '@nestjs/core';
import { AuthMModule } from './auth_m.module';

async function bootstrap() {
  const app = await NestFactory.create(AuthMModule);
  await app.listen(process.env.port ?? 3000);
}
bootstrap();
