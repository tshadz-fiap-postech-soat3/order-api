import { Injectable } from '@nestjs/common';
import { OrderItemsRepositoryInterface } from './order-items-repository.interface';
import { PrismaService } from '../../../external/driven/infra/database/prisma.service';
import { CreateOrderItemDto } from '../dtos/order-item/create-order-item.dto';
import { UpdateOrderItemDto } from '../dtos/order-item/update-order-item.dto';
import { OrderItemEntity } from '../entitites/order-item';

@Injectable()
export class PrismaOrderItemsRepository implements OrderItemsRepositoryInterface {
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
