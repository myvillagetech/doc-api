import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
  });

  app.useGlobalPipes(new ValidationPipe());

  const options = new DocumentBuilder()
    .setTitle('Doc Discussion')
    .setDescription('Document Discussion API')
    .setVersion('1.0')
    .addTag('auth')
    .addTag('users')
    .addTag('chats')
    .addTag('discussions')
    .addTag('documents')
    .addTag('messages')
    .addBearerAuth(
      { type: 'http', scheme: 'bearer', bearerFormat: 'jwt' },
      'access-token',
    )
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  await app.listen(5000);
}
bootstrap();
