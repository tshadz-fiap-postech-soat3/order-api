import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const config = new DocumentBuilder()
    .setTitle('Fast Food')
    .setDescription('Api to handle a fastfood service')
    .setVersion('1.0.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('swagger', app, document);
  const apiPort = process.env.PORT ?? 8080;
  await app.listen(apiPort, () =>
    console.log(`Application listening on the port ${apiPort}`),
  );

  app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://localhost:5672'],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
}

bootstrap().finally();
