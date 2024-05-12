import { Module } from '@nestjs/common';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { OrdersService } from './orders.service';
import { OrdersApi } from '../../external/driver/orders.api';
import { IOrderService } from './services/order-service.interface';
import { IOrdersController } from './controller/iorders-controller';
import { OrdersController } from './controller/orders.controller';
import { OrderRepositoryProvider } from './repositories/order-repository.provider';

@Module({
  controllers: [OrdersApi],
  providers: [
    OrderRepositoryProvider,
    OrdersService,
    {
      provide: IOrderService,
      useClass: OrdersService,
    },
    OrdersController,
    {
      provide: IOrdersController,
      useClass: OrdersController,
    },
    PrismaService,
  ],
})
export class OrdersModule {}
