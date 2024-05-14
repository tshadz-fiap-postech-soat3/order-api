import { Module } from '@nestjs/common';
import { IOrderItemsRepository } from './repositories/iorder-items.repository';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { OrderItemsService } from './order-items.service';
import { OrderItemsApi } from '../../external/driver/order-items.api';
import { PrismaOrderItemsRepository } from './repositories/prisma-order-items-repository';
import { IOrderItemsService } from './iorderItems.service';
import { IOrderItemsController } from './controller/iorder-item-controller';
import { OrderItemsController } from './controller/order-item.controller';

@Module({
  controllers: [OrderItemsApi],
  providers: [
    PrismaOrderItemsRepository,
    {
      provide: IOrderItemsRepository,
      useClass: PrismaOrderItemsRepository,
    },
    OrderItemsService,
    {
      provide: IOrderItemsService,
      useClass: OrderItemsService,
    },
    OrderItemsController,
    {
      provide: IOrderItemsController,
      useClass: OrderItemsController,
    },
    PrismaService,
  ],
})
export class OrderItemsModule {}
