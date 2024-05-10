import { Module } from '@nestjs/common';
import { IOrdersRepository } from './order-item/repositories/iorder.repository';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { PrismaOrdersRepository } from './repositories/prisma-orders-repository';
import { OrdersService } from './orders.service';
import { OrdersApi } from '../../external/driver/orders.api';
import { IOrdersService } from './iorders.service';
import { IOrdersController } from './controller/iorders-controller';
import { OrdersController } from './controller/orders.controller';

@Module({
  controllers: [OrdersApi],
  providers: [
    PrismaOrdersRepository,
    {
      provide: IOrdersRepository,
      useClass: PrismaOrdersRepository,
    },
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
