import { Inject, Injectable } from '@nestjs/common';
import { IOrderItemsRepository } from '../repositories/iorder-items.repository';
import { CreateOrderItemDto } from './dtos/order-item/create-order-item.dto';
import { UpdateOrderItemDto } from './dtos/order-item/update-order-item.dto';
import { OrderItemsServiceInterface } from './order-items-service.interface';
import { ResultError } from '../../application/result/result-error';
import { ResultSuccess } from '../../application/result/result-success';
import { OrderItemEntity } from './entitites/order-item';

@Injectable()
export class OrderItemsService implements OrderItemsServiceInterface {
  constructor(
    @Inject(IOrderItemsRepository)
    private readonly orderItemsRepository: IOrderItemsRepository,
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
