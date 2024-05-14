import { Test, TestingModule } from '@nestjs/testing';
import { IOrdersRepository } from '../../../src/@core/order/repositories/iorder.repository';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { PrismaOrdersRepository } from '../../../src/@core/order/repositories/prisma-orders-repository';
import { OrdersService } from '../../../src/@core/order/orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: IOrdersRepository,
          useClass: PrismaOrdersRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<OrdersService>(OrdersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
