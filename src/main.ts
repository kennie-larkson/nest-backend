import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ConfigService } from '@nestjs/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const configService = app.get<ConfigService>(ConfigService);
  const port = configService.get('PORT');

  app.useGlobalPipes(new ValidationPipe({}));
  const config = new DocumentBuilder()
    .addBearerAuth() // this decorator specifies the Bearer Authentication security mechanism for the API documentation
    .setTitle('Authentication System')
    .setDescription('The Authentication system API decsription.')
    .setVersion('v1.0')
    .addTag('swagger-documentation')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(port);
  console.log(`App started on port ${port}`);
}
bootstrap();
