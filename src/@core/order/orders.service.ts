import { Inject, Injectable } from '@nestjs/common';
import { IOrdersRepository } from './repositories/iorder.repository';
import { CreateOrderDto } from './entitites/create-order.dto';
import { UpdateOrderDto } from './entitites/update-order.dto';
import { OrderStatus } from './entitites/order';
import { IOrdersService } from './iorders.service';
import { ResultError } from '../application/result/result-error';
import { ResultSuccess } from '../application/result/result-success';
import { PubSubClient } from '../../external/driven/infra/pubsub/pubsub.client';

@Injectable()
export class OrdersService implements IOrdersService {
  constructor(
    @Inject(IOrdersRepository)
    private ordersRepository: IOrdersRepository,
    private readonly pubSubClient: PubSubClient,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const result = await this.ordersRepository.insert(createOrderDto);
    if (!result) {
      return new ResultError('Not able to create the order');
    }

    // Publicar mensagem no Pub/Sub
    await this.pubSubClient.publishMessage('order-topic', result);

    return new ResultSuccess(result);
  }

  async findAll() {
    const result = await this.ordersRepository.findAll();
    if (!result) {
      return new ResultError('order not exist');
    }
    return new ResultSuccess(result);
  }

  async findAllByStatus(status: OrderStatus) {
    const result = await this.ordersRepository.findAllByStatus(status);
    if (!result) {
      return new ResultError('order not exist');
    }
    return new ResultSuccess(result);
  }

  async findOne(id: string) {
    const result = await this.ordersRepository.findById(id);
    if (!result) {
      return new ResultError('order not exist');
    }
    return new ResultSuccess(result);
  }

  async update(id: string, updateOrderDto: UpdateOrderDto) {
    const result = await this.ordersRepository.update(id, updateOrderDto);
    if (!result) {
      return new ResultError('Not able to update the order');
    }
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
