import { Injectable } from '@nestjs/common';
import { IOrderItemRepository } from '../../../../../@core/order/repositories/order-item-repository.interface';
import { PrismaService } from '../prisma.service';
import { OrderItemEntity } from '../../../../../@core/order/entitites/order-item.entity';

@Injectable()
export class OrderItemRepository implements IOrderItemRepository {
  constructor(private prisma: PrismaService) {}

  async insertMany(order: OrderItemEntity[]): Promise<OrderItemEntity[]> {
    const result = await this.prisma.orderItems.createMany({
      data: order,
    });

    return result as unknown as OrderItemEntity[];
  }

  async findByOrderId(id: string): Promise<OrderItemEntity> {
    const result = await this.prisma.orderItems.findMany({
      where: {
        orderId: id,
      },
    });
    return result as unknown as OrderItemEntity;
  }
}
