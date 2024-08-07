import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { ProductExternalProvider } from '../services/product-external.provider';
import { OrderItemRepositoryProvider } from './repositories/order-item-repository.provider';
import { OrderRepositoryProvider } from './repositories/order-repository.provider';

@Module({
  imports: [ConfigModule],
  providers: [
    PrismaService,
    ProductExternalProvider,
    OrderItemRepositoryProvider,
    OrderRepositoryProvider,
  ],
  exports: [
    ProductExternalProvider,
    OrderItemRepositoryProvider,
    OrderRepositoryProvider,
  ],
})
export class DatabaseModule {}
