import { Module } from '@nestjs/common';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { OrderService } from './order.service';
import { OrdersApi } from '../../external/driver/orders.api';
import { IOrderService } from './services/order-service.interface';
import { OrderControllerInterface } from './controller/order-controller.interface';
import { OrderController } from './controller/order.controller';
import { OrderRepositoryProvider } from './repositories/order-repository.provider';
import { InfraModule } from '../../external/driven/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [OrdersApi],
  providers: [
    OrderRepositoryProvider,
    OrderService,
    {
      provide: IOrderService,
      useClass: OrderService,
    },
    OrderController,
    {
      provide: OrderControllerInterface,
      useClass: OrderController,
    },
    PrismaService,
  ],
})
export class OrderModule {}
