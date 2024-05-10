import { Injectable } from '@nestjs/common';
import { IOrderItemsRepository } from '../order-item/repositories/iorder-items.repository';
import { PrismaService } from '../../../external/driven/infra/database/prisma.service';
import { CreateOrderItemDto } from '../order-item/dtos/order-item/create-order-item.dto';
import { UpdateOrderItemDto } from '../order-item/dtos/order-item/update-order-item.dto';
import { OrderItemEntity } from '../order-item/entitites/order-item';

@Injectable()
export class PrismaOrderItemsRepository implements IOrderItemsRepository {
  constructor(private prisma: PrismaService) {}

  async insert(order: CreateOrderItemDto[]): Promise<OrderItemEntity[]> {
    const result = await this.prisma.orderItems.createMany({
      data: order,
    });

    return result as unknown as OrderItemEntity[];
  }

  async update(
    id: string,
    order: UpdateOrderItemDto,
  ): Promise<OrderItemEntity> {
    return await this.prisma.orderItems.update({
      data: order,
      where: {
        id: id,
      },
    });
  }

  async findByOrderId(id: string): Promise<OrderItemEntity> {
    const result = await this.prisma.orderItems.findMany({
      where: {
        orderId: id,
      },
    });
    return result as unknown as OrderItemEntity;
  }

  async findAll(): Promise<OrderItemEntity[]> {
    const result = await this.prisma.orderItems.findMany();
    return result as unknown as OrderItemEntity[];
  }

  async delete(id: string): Promise<void> {
    await this.prisma.orderItems.delete({
      where: {
        id: id,
      },
    });
  }
}
