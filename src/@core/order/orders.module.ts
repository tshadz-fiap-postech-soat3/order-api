import { Module } from '@nestjs/common';
import { IOrdersRepository } from './order-item/repositories/order-repository.interface';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { OrderRepository } from './order-item/repositories/order-repository';
import { OrdersService } from './orders.service';
import { OrdersApi } from '../../external/driver/orders.api';
import { IOrdersService } from './iorders.service';
import { IOrdersController } from './controller/iorders-controller';
import { OrdersController } from './controller/orders.controller';
import { OrderRepositoryProvider } from './order-item/repositories/order-repository.provider';

@Module({
  controllers: [OrdersApi],
  providers: [
    OrderRepositoryProvider,
    OrdersService,
    {
      provide: IOrdersService,
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
