import { Injectable } from '@nestjs/common';
import { OrderItemRepositoryInterface } from '../../../../../@core/order/repositories/order-item-repository.interface';
import { PrismaService } from '../prisma.service';
import { CreateOrderItemDto } from '../../../../../@core/order/dtos/order-item/create-order-item.dto';
import { UpdateOrderItemDto } from '../../../../../@core/order/dtos/order-item/update-order-item.dto';
import { OrderItemEntity } from '../../../../../@core/order/entitites/order-item';

@Injectable()
export class OrderItemRepository implements OrderItemRepositoryInterface {
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
