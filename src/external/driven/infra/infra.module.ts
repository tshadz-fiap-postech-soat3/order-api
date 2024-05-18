import { ProductServiceProvider } from './services/product-service.provider';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProductServiceProvider],
  exports: [DatabaseModule, ProductServiceProvider]
})
export class InfraModule {}
