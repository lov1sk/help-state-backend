import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import * as dotenv from 'dotenv';

dotenv.config();
async function bootstrap() {
  const PORT = process.env.BACKEND_PORT ?? 3333;
  const app = await NestFactory.create(AppModule);

  app.enableCors();
  app.setGlobalPrefix('help-state-api/v1');
  app.useGlobalPipes(
    new ValidationPipe({
      transformOptions: {
        enableImplicitConversion: false,
      },
    }),
  );

  await app.listen(PORT);
  console.log(`Backend nest started at: ${PORT}`);
}
bootstrap();
