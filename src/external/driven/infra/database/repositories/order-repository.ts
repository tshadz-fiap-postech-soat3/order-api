import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../../../../../@core/order/repositories/order-repository.interface';
import { PrismaService } from '../prisma.service';
import { CreateOrderDto } from '../../../../../@core/order/dtos/create-order.dto';
import { UpdateOrderDto } from '../../../../../@core/order/dtos/update-order.dto';
import { OrderEntity } from '../../../../../@core/order/entitites/order.entity';
import { OrderStatus } from '../../../../../@core/order/enums/order-status.enum';

@Injectable()
export class OrderRepository implements IOrderRepository {
  constructor(private prisma: PrismaService) {}

  async insert(order: CreateOrderDto): Promise<OrderEntity> {
    const result = await this.prisma.order.create({
      data: order,
    });
    return result as unknown as OrderEntity;
  }

  async update(id: string, order: UpdateOrderDto): Promise<OrderEntity> {
    const result = await this.prisma.order.update({
      data: order,
      where: {
        id: id,
      },
    });
    return result as unknown as OrderEntity;
  }

  async findById(id: string): Promise<OrderEntity> {
    const result = await this.prisma.order.findUniqueOrThrow({
      where: {
        id: id,
      },
    });
    return result as unknown as OrderEntity;
  }

  async findAll(): Promise<OrderEntity[]> {
    const result = await this.prisma.order.findMany();
    console.log(result);
    return result as unknown as OrderEntity[];
  }

  async findAllByStatus(status: OrderStatus): Promise<OrderEntity[]> {
    const result = await this.prisma.order.findMany({
      where: {
        status: status,
      },
    });
    return result as unknown as OrderEntity[];
  }

  async delete(id: string): Promise<void> {
    await this.prisma.order.delete({
      where: {
        id: id,
      },
    });
  }

  async findAllOpen(): Promise<OrderEntity[]> {
    const result = await this.prisma.order.findMany({
      where: {
        NOT: {
          status: OrderStatus.CONCLUDED,
        },
      },
      orderBy: [
        {
          status: 'asc',
        },
        {
          createdAtDate: 'asc',
        },
      ],
    });
    return result as unknown as OrderEntity[];
  }
}
