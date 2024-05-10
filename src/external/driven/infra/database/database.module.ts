import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { PrismaService } from './prisma.service';
import { IOrdersRepository } from '../../../../@core/order/order-item/repositories/iorder.repository';
import { PrismaOrdersRepository } from '../../../../../src/@core/order/repositories/prisma-orders-repository';

@Module({
  exports: [IOrdersRepository],
  imports: [ConfigModule],
  providers: [
    PrismaService,
    {
      provide: IOrdersRepository,
      useClass: PrismaOrdersRepository,
    },
  ],
})
export class DatabaseModule {}
