import { Test, TestingModule } from '@nestjs/testing';
import { OrdersApi } from '../../../src/external/driver/orders.api';
import { OrdersService } from '../../../src/@core/order/orders.service';
import { IOrdersRepository } from '../../../src/@core/order/repositories/order-repository.interface';
import { OrderRepository } from '../../../src/@core/order/repositories/order-repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { OrderController } from '../../../src/@core/order/controller/order.controller';
import { OrderServiceInterface } from '../../../src/@core/order/services/order-service.interface';
import { IOrdersController } from '../../../src/@core/order/controller/iorders-controller';

describe('OrdersApi', () => {
  let controller: OrdersApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersApi],
      providers: [
        {
          provide: IOrdersController,
          useClass: OrderController,
        },
        {
          provide: OrderServiceInterface,
          useClass: OrdersService,
        },
        {
          provide: IOrdersRepository,
          useClass: OrderRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<OrdersApi>(OrdersApi);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
