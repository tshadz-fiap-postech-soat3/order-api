import { Test, TestingModule } from '@nestjs/testing';
import { IOrdersRepository } from '../../../src/@core/order/order-item/repositories/order-repository.interface';
import { PrismaService } from '../../../src/external/driven/infra/database/prisma.service';
import { OrderRepository } from '../../../src/@core/order/order-item/repositories/order-repository';
import { OrdersService } from '../../../src/@core/order/orders.service';

describe('OrdersService', () => {
  let service: OrdersService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        OrdersService,
        {
          provide: IOrdersRepository,
          useClass: OrderRepository,
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
