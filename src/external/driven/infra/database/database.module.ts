import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { IOrderRepository } from '../../../../@core/order/repositories/order-repository.interface';
import { OrderRepository } from './repositories/order-repository';
import { ProductServiceProvider } from '../services/product-service.provider';
import { OrderItemRepositoryProvider } from './repositories/order-item-repository.provider';
import { OrderRepositoryProvider } from './repositories/order-repository.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    PrismaService,
    ProductServiceProvider,
    OrderItemRepositoryProvider,
    OrderRepositoryProvider
  ],
  exports: [
    ProductServiceProvider,
    OrderItemRepositoryProvider,
    OrderRepositoryProvider
  ],
})
export class DatabaseModule {}
