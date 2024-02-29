import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';

const logger = new Logger('Bootstrap');

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const port = 4000;
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(port);
  logger.log(`🚀 Server running on http://localhost:${port}/graphql`);
}
bootstrap();
