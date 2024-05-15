import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { IOrderRepository } from '../../../../@core/order/repositories/order-repository.interface';
import { OrderRepository } from './repositories/order-repository';

@Module({
  exports: [IOrderRepository],
  imports: [ConfigModule],
  providers: [
    PrismaService,
    {
      provide: IOrderRepository,
      useClass: OrderRepository,
    },
  ],
})
export class DatabaseModule {}
