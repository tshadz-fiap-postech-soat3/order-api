import { Test, TestingModule } from '@nestjs/testing';
import { OrdersController } from '../../../src/external/driver/orders.api';
import { OrdersService } from '../../../src/@core/order/orders.service';
import { IOrdersRepository } from '../../../src/@core/order/repositories/iorder.repository';
import { PrismaOrdersRepository } from '../../../src/@core/order/repositories/prisma-orders-repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';

describe('OrdersController', () => {
  let controller: OrdersController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersController],
      providers: [
        OrdersService,
        {
          provide: IOrdersRepository,
          useClass: PrismaOrdersRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<OrdersController>(OrdersController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
