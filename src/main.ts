import { NestFactory } from '@nestjs/core';
import { SwaggerModule } from '@nestjs/swagger';
import { GlobalExceptionsFilter } from '@shared-base-lib';
import { configDotenv } from 'dotenv';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { swaggerConfig } from './configs';

async function bootstrap() {
  configDotenv();

  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const logger = app.get<Logger>(Logger);
  app.useLogger(logger);

  const swaggerDocument = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('docs', app, swaggerDocument);

  app.useGlobalFilters(new GlobalExceptionsFilter());

  await app.listen(process.env.PORT ?? 3000);

  const host = `http://localhost:${process.env.PORT}`;
  logger.log(`Application running at: ${host}/api/v${process.env.VERSION}`);
  logger.log(`Swagger docs available at: ${host}/docs`);
}

bootstrap().catch((error) => {
  console.error('❌ Error starting application:', error);
  process.exit(1);
});
