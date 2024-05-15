import { ProductServiceProvider } from './services/product-service.provider';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [ProductServiceProvider],
  exports: [ProductServiceProvider]
})
export class InfraModule {}
