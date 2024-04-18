import { Test, TestingModule } from '@nestjs/testing';
import { OrderItemsController } from '../../../src/external/driver/order-items.api';
import { OrderItemsService } from '../../../src/@core/order-item/order-items.service';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { IOrderItemsRepository } from '../../../src/@core/order-item/repositories/iorder-items.repository';
import { PrismaOrderItemsRepository } from '../../../src/@core/order-item/repositories/prisma-order-items-repository';

describe('OrderItemsController', () => {
  let controller: OrderItemsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrderItemsController],
      providers: [
        OrderItemsService,
        {
          provide: IOrderItemsRepository,
          useClass: PrismaOrderItemsRepository,
        },
        PrismaService,
      ],
    }).compile();

    controller = module.get<OrderItemsController>(OrderItemsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
