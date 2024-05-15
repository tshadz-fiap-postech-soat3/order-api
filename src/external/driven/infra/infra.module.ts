import { ProductServiceProvider } from './services/product-service.provider';
import { Module } from '@nestjs/common';

@Module({
  controllers: [],
  providers: [
    ProductServiceProvider
  ],
})
export class OrdersModule {}
