import { Test, TestingModule } from '@nestjs/testing';
import { OrdersApi } from '../../../src/external/driver/orders.api';
import { OrdersService } from '../../../src/@core/order/orders.service';
import { IOrdersRepository } from '../../../src/@core/order/repositories/iorder.repository';
import { PrismaOrdersRepository } from '../../../src/@core/order/repositories/prisma-orders-repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { OrdersController } from '../../../src/@core/order/controller/orders.controller';
import { IOrdersService } from '../../../src/@core/order/iorders.service';
import { IOrdersController } from '../../../src/@core/order/controller/iorders-controller';
import { PubSubClient } from '../../../src/external/driven/infra/pubsub/pubsub.client';

describe('OrdersApi', () => {
  let controller: OrdersApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersApi],
      providers: [
        {
          provide: IOrdersController,
          useClass: OrdersController,
        },
        {
          provide: IOrdersService,
          useClass: OrdersService,
        },
        {
          provide: IOrdersRepository,
          useClass: PrismaOrdersRepository,
        },
        PrismaService,
        PubSubClient,
      ],
    }).compile();

    controller = module.get<OrdersApi>(OrdersApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
