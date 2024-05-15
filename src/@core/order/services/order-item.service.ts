import { Inject, Injectable } from '@nestjs/common';
import { OrderItemsRepositoryInterface } from '../repositories/order-items-repository.interface';
import { CreateOrderItemDto } from '../dtos/order-item/create-order-item.dto';
import { UpdateOrderItemDto } from '../dtos/order-item/update-order-item.dto';
import { OrderItemServiceInterface } from './order-item-service.interface';
import { ResultError } from '../../application/result/result-error';
import { ResultSuccess } from '../../application/result/result-success';
import { OrderItemEntity } from '../entitites/order-item';

@Injectable()
export class OrderItemService implements OrderItemServiceInterface {
  constructor(
    @Inject(OrderItemsRepositoryInterface)
    private readonly orderItemsRepository: OrderItemsRepositoryInterface,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto[]) {
    const result = await this.orderItemsRepository.insert(createOrderItemDto);
    if (!result) {
      return new ResultError('Not able to create the order');
    }
    return new ResultSuccess(result as unknown as OrderItemEntity[]);
  }

  async findAll() {
    const result = await this.orderItemsRepository.findAll();
    if (!result) {
      return new ResultError('order not exist');
    }
    return new ResultSuccess(result);
  }

  async findOne(id: string) {
    const result = await this.orderItemsRepository.findByOrderId(id);
    if (!result) {
      return new ResultError('order not exist');
    }
    return new ResultSuccess(result);
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    const result = await this.orderItemsRepository.update(
      id,
      updateOrderItemDto,
    );
    if (!result) {
      return new ResultError('Not able to update the order');
    }
    return new ResultSuccess(result);
  }

  async remove(id: string) {
    return await this.orderItemsRepository.delete(id);
  }
}
