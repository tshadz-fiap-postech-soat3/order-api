import { Injectable } from '@nestjs/common';
import { IOrderRepository } from '../repositories/order-repository.interface';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { IOrderService } from './order-service.interface';
import { ResultError } from '../../application/result/result-error';
import { ResultSuccess } from '../../application/result/result-success';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderEntity } from '../entitites/order.entity';
import {
  IProductService,
  RetrievePriceOfProductsInTotalAndPerUnitRequestDto,
} from './product-service.interface';
import { ProductEntity } from '../entitites/product.entity';
import { OrderItemEntity } from '../entitites/order-item.entity';
import { IOrderItemRepository } from '../repositories/order-item-repository.interface';
import { CreateOrderItemDto } from '../dtos/order-item/create-order-item.dto';
import { RetrieveProductPriceUnitAndTotalDto } from '../dtos/retrieve-product-price-unit-and-total.dto';

@Injectable()
export class OrderService implements IOrderService {
  constructor(
    private ordersRepository: IOrderRepository,
    private orderItemRepository: IOrderItemRepository,
    private productService: IProductService,
  ) {}

  async create({ customerId, items }: CreateOrderDto) {
    const retrievedProductsPrice =
      await this.recoverPriceOfProductsInTotalAndPerUnit(items);
    const order = new OrderEntity(
      retrievedProductsPrice.totalPrice,
      customerId,
    );
    const result = await this.ordersRepository.insert(order);
    if (!result) return new ResultError('Not able to create the order');
    await this.orderItemRepository.insertMany(
      this.mapOrderItemsFromProducts(order.id, retrievedProductsPrice.products),
    );
    return new ResultSuccess(result);
  }

  private mapOrderItemsFromProducts(
    orderId: string,
    items: ProductEntity[],
  ): OrderItemEntity[] {
    return items.map(
      (item) =>
        new OrderItemEntity(orderId, item.id, item.quantity, item.price),
    );
  }
  private async recoverPriceOfProductsInTotalAndPerUnit(
    items: CreateOrderItemDto[],
  ): Promise<RetrieveProductPriceUnitAndTotalDto> {
    const retrievePriceProducts: RetrievePriceOfProductsInTotalAndPerUnitRequestDto =
      {
        products: items.map(({ productId }) => ({
          id: productId,
        })),
      };
    const retrievedProducts =
      await this.productService.retrievePriceOfProductsInTotalAndPerUnit(
        retrievePriceProducts,
      );

    return {
      totalPrice: retrievedProducts.data.totalPrice,
      products: retrievedProducts.data.products,
    };
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
