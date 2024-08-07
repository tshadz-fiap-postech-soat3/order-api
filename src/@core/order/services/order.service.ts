import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../repositories/order-repository.interface';
import {
  CreateOrderItemServiceDto,
  CreateOrderServiceDto,
  IOrderService,
} from './order-service.interface';
import { ResultError } from '../../application/result/result-error';
import { ResultSuccess } from '../../application/result/result-success';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderEntity } from '../entitites/order.entity';
import { OrderItemEntity } from '../entitites/order-item.entity';
import { IOrderItemRepository } from '../repositories/order-item-repository.interface';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    private ordersRepository: IOrderRepository,
    private orderItemRepository: IOrderItemRepository,
  ) {}

  async create({ customerId, items, price }: CreateOrderServiceDto) {
    const order = new OrderEntity(price, customerId);
    const result = await this.ordersRepository.insert(order);
    if (!result) return new ResultError('Not able to create the order');
    const mappedOrder = this.mapOrderItemsFromProducts(order.id, items);
    await this.orderItemRepository.insertMany(mappedOrder);
    return new ResultSuccess(result);
  }

  private mapOrderItemsFromProducts(
    orderId: string,
    items: CreateOrderItemServiceDto[],
  ): OrderItemEntity[] {
    return items.map(
      (item) =>
        new OrderItemEntity(orderId, item.productId, item.quantity, item.price),
    );
  }

  async findAll() {
    const result = await this.ordersRepository.findAll();
    if (!result) return new ResultError('order not exist');
    return new ResultSuccess(result);
  }

  async findAllByStatus(status: OrderStatus) {
    const result = await this.ordersRepository.findAllByStatus(status);
    if (!result) return new ResultError('order not exist');
    return new ResultSuccess(result);
  }

  async findOne(id: string) {
    const result = await this.ordersRepository.findById(id);
    if (!result) return new ResultError('order not exist');
    result.items = await this.orderItemRepository.findByOrderId(id);
    return new ResultSuccess(result);
  }

  async update(id: string, order: OrderEntity) {
    const result = await this.ordersRepository.update(id, order);
    if (!result) return new ResultError('Not able to update the order');
    return new ResultSuccess(result);
  }

  async remove(id: string) {
    return await this.ordersRepository.delete(id);
  }

  async findAllOpen() {
    const result = await this.ordersRepository.findAllOpen();
    if (!result) {
      return new ResultError('order not exist');
    }
    return new ResultSuccess(result);
  }
}
