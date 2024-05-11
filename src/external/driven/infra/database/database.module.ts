import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { IOrdersRepository } from '../../../../@core/order/order-item/repositories/order-repository.interface';
import { OrderRepository } from '../../../../@core/order/order-item/repositories/order-repository';

@Module({
  exports: [IOrdersRepository],
  imports: [ConfigModule],
  providers: [
    PrismaService,
    {
      provide: IOrdersRepository,
      useClass: OrderRepository,
    },
  ],
})
export class DatabaseModule {}
