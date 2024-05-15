import { Module } from '@nestjs/common';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { OrdersApi } from '../../external/driver/orders.api';
import { InfraModule } from '../../external/driven/infra/infra.module';
import { OrderServiceProvider } from './services/order-service.provider';
import { OrderControllerProvider } from './controller/order-controller.provider';
import { OrderStrategiesModule } from './services/order-strategies/order-strategies.module';

@Module({
  imports: [InfraModule, OrderStrategiesModule],
  controllers: [OrdersApi],
  providers: [
    OrderServiceProvider,
    OrderControllerProvider,
    PrismaService,
  ],
})
export class OrderModule {}
