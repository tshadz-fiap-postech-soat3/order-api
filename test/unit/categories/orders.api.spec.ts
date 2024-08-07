import { Test, TestingModule } from '@nestjs/testing';
import { OrdersApi } from '../../../src/external/driver/orders.api';
import { OrderService } from '../../../src/@core/order/services/order.service';
import { IOrdersRepository } from '../../../src/@core/order/repositories/order-repository.interface';
import { OrderRepository } from '../../../src/external/driven/infra/database/repositories/order-repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { OrderController } from '../../../src/@core/order/controllers/order.controller';
import { OrderServiceInterface } from '../../../src/@core/order/services/order-service.interface';
import { OrderControllerInterface } from '../../../src/@core/order/controllers/order-controller.interface';

describe('OrdersApi', () => {
  let controller: OrdersApi;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersApi],
      providers: [
        {
          provide: OrderControllerInterface,
          useClass: OrderController,
        },
        {
          provide: OrderServiceInterface,
          useClass: OrderService,
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
