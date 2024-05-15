import { Module } from '@nestjs/common';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { OrdersApi } from '../../external/driver/orders.api';
import { OrderRepositoryProvider } from './repositories/order-repository.provider';
import { InfraModule } from '../../external/driven/infra/infra.module';
import { OrderServiceProvider } from './services/order-service.provider';
import { OrderControllerProvider } from './controller/order-controller.provider';

@Module({
  imports: [InfraModule],
  controllers: [OrdersApi],
  providers: [
    OrderRepositoryProvider,
    OrderServiceProvider,
    OrderControllerProvider,
    PrismaService,
  ],
})
export class OrderModule {}
