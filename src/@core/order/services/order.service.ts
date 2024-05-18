import { Inject, Injectable } from '@nestjs/common';
import { IOrderRepository } from '../repositories/order-repository.interface';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { IOrderService } from './order-service.interface';
import { ResultError } from '../../application/result/result-error';
import { ResultSuccess } from '../../application/result/result-success';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderEntity } from '../entitites/order.entity';
import { IProductService } from './product-service.interface';
import { ProductEntity } from '../entitites/product.entity';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    @Inject(IOrderRepository)
    private ordersRepository: IOrderRepository,
    private productService: IProductService,
  ) {}

  async create({ customerId, items }: CreateOrderDto) {
    const productsIds = items.map((item) =>
      new ProductEntity().setId(item.productId),
    );
    const orderPrice =
      await this.productService.calculateTotalPrice(productsIds);
    const order = new OrderEntity(orderPrice.data, customerId);
    const result = await this.ordersRepository.insert(order);
    if (!result) return new ResultError('Not able to create the order');
    return new ResultSuccess(result);
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
