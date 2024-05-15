import { ProductServiceProvider } from './services/product-service.provider';
import { Module } from '@nestjs/common';
import { OrderItemRepositoryProvider } from './database/repositories/order-item-repository.provider';
import { OrderRepository } from './database/repositories/order-repository';

@Module({
  providers: [ProductServiceProvider, OrderItemRepositoryProvider, OrderRepository],
  exports: [ProductServiceProvider, OrderItemRepositoryProvider, OrderRepository]
})
export class InfraModule {}
