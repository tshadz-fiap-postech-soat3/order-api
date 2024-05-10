import { Module } from '@nestjs/common';
import { IOrderItemsRepository } from './repositories/iorder-items.repository';
import { PrismaService } from '../../../external/driven/infra/database/prisma.service';
import { OrderItemsService } from './order-items.service';
import { OrderItemsApi } from '../../../external/driver/order-items.api';
import { PrismaOrderItemsRepository } from '../repositories/prisma-order-items-repository';
import { OrderItemsServiceInterface } from './order-items-service.interface';


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
      provide: OrderItemsServiceInterface,
      useClass: OrderItemsService,
    },
    PrismaService,
  ],
})
export class OrderItemsModule {}
