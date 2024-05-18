import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './external/driven/infra/database/prisma.service';
import { AppModule } from './app.module';

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
  const apiPort = process.env.PORT ?? 8080
  await app.listen(apiPort, () => console.log(`Application listening on the port ${apiPort}`));
}

bootstrap().finally();
