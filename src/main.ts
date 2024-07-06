import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { PrismaService } from './external/driven/infra/database/prisma.service';
import { AppModule } from './app.module';
import { execSync } from 'child_process';
import { Logger } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const prismaService = app.get(PrismaService);
  const logger = new Logger('Bootstrap');

  try {
    // Executa as migrações do Prisma
    logger.log('Running Prisma migrations...');
    execSync('npx prisma migrate dev --name init', { stdio: 'inherit' });

    // Executa o script de seed do Prisma
    logger.log('Running Prisma seed script...');
    execSync('npx ts-node prisma/seed.ts', { stdio: 'inherit' });

    // Inicia o servidor Nest.js
    app.enableCors();

    const config = new DocumentBuilder()
      .setTitle('Fast Food')
      .setDescription('Api to handle a fastfood service')
      .setVersion('1.0.0')
      .build();

    const document = SwaggerModule.createDocument(app, config);

    SwaggerModule.setup('swagger', app, document);

    await app.listen(process.env.PORT ?? 8080);
    logger.log('Application started successfully');
  } catch (error) {
    logger.error('Error starting application', error);
    process.exit(1);
  }
}
bootstrap();
