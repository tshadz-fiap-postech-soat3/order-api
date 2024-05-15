import { Module } from '@nestjs/common';
import { PrismaService } from '../../external/driven/infra/database/prisma.service';
import { OrdersService } from './orders.service';
import { OrdersApi } from '../../external/driver/orders.api';
import { IOrderService } from './services/order-service.interface';
import { IOrdersController } from './controller/iorders-controller';
import { OrderController } from './controller/order.controller';
import { OrderRepositoryProvider } from './repositories/order-repository.provider';
import { InfraModule } from '../../external/driven/infra/infra.module';

@Module({
  imports: [InfraModule],
  controllers: [OrdersApi],
  providers: [
    OrderRepositoryProvider,
    OrdersService,
    {
      provide: IOrderService,
      useClass: OrdersService,
    },
    OrderController,
    {
      provide: IOrdersController,
      useClass: OrderController,
    },
    PrismaService,
  ],
})
export class OrdersModule {}
