import { CorsOptions } from '@nestjs/common/interfaces/external/cors-options.interface';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  const corsOptions: CorsOptions = {
    origin: 'http://localhost:5173',
    credentials: true,
  };
  app.enableCors(corsOptions);

  await app.listen(8080);
}
bootstrap();
