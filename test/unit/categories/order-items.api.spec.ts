import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsApi } from '../../../src/external/driver/order-items.api';
import { OrderItemsService } from '../../../src/@core/order-item/order-items.service';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { IOrderItemsRepository } from '../../../src/@core/order-item/repositories/iorder-items.repository';
import { PrismaOrderItemsRepository } from '../../../src/@core/order-item/repositories/prisma-order-items-repository';
import { OrderItemsController } from '../../../src/@core/order-item/controller/order-item.controller';
import { IOrderItemsService } from '../../../src/@core/order-item/iorderItems.service';

describe('OrderItemsApi', () => {
  let controller: OrderItemsApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemsApi],
      providers: [
        OrderItemsController,
        {
          provide: IOrderItemsService,
          useClass: OrderItemsService,
        },
        {
          provide: IOrderItemsRepository,
          useClass: PrismaOrderItemsRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<OrderItemsApi>(OrderItemsApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
