import { Test, TestingModule } from '@nestjs/testing';
import { IOrderItemsRepository } from '../../../src/@core/order-item/repositories/iorder-items.repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { PrismaOrderItemsRepository } from '../../../src/@core/order-item/repositories/prisma-order-items-repository';
import { OrderItemsService } from '../../../src/@core/order-item/order-items.service';

describe('OrderItemsService', () => {
  let service: OrderItemsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderItemsService,
        {
          provide: IOrderItemsRepository,
          useClass: PrismaOrderItemsRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<OrderItemsService>(OrderItemsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
