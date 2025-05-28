import { NestFactory } from '@nestjs/core';
import { Transport, MicroserviceOptions } from '@nestjs/microservices';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  // Create HTTP application
  const app = await NestFactory.create(AppModule);

  // Get configuration from environment variables
  const redisHost = process.env.REDIS_HOST || 'localhost';
  const redisPort = parseInt(process.env.REDIS_PORT || '6379');
  const port = parseInt(process.env.PORT || '3001');

  // Connect microservice to the HTTP app
  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.REDIS,
    options: {
      host: redisHost,
      port: redisPort,
      retryAttempts: 5,
      retryDelay: 3000,
    },
  });

  // Enable CORS for development
  app.enableCors({
    origin: true,
    credentials: true,
  });

  // Start microservice
  app.useGlobalPipes(new ValidationPipe({
    whitelist: true,
    forbidNonWhitelisted: true,
    transform: true,
  }));
  
  await app.startAllMicroservices();

  // Start HTTP server
  await app.listen(port);
  console.log('🚀 HTTP Server running on http://localhost:' + port);
  console.log('📡 Redis Microservice connected to ' + redisHost + ':' + redisPort);
  console.log('🌍 Environment:', process.env.NODE_ENV || 'development');
}
bootstrap();