import { DocumentBuilder } from '@nestjs/swagger';
import { configDotenv } from 'dotenv';

configDotenv();

export const swaggerConfig = new DocumentBuilder()
  .setTitle(`${process.env.PROJECT_NAME} API Documentation`)
  .setDescription(`${process.env.PROJECT_NAME} Swagger For API Documentation`)
  .setVersion(`${process.env.VERSION}`)
  .addServer(
    `http://localhost:${process.env.PORT}/`,
    `${process.env.PROJECT_NAME} Local environment`,
  )
  .addTag(`List of ${process.env.PROJECT_NAME} API's`)
  .addBearerAuth()
  .build();
