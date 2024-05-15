import { Test, TestingModule } from '@nestjs/testing';
import { IOrdersRepository } from '../../../src/@core/order/repositories/order-repository.interface';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { OrderRepository } from '../../../src/external/driven/infra/database/repositories/order-repository';
import { OrderService } from '../../../src/@core/order/services/order.service';

describe('OrdersService', () => {
  let service: OrderService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrderService,
        {
          provide: IOrdersRepository,
          useClass: OrderRepository,
        },
        PrismaService,
      ],
    }).compile();

    service = module.get<OrderService>(OrderService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
