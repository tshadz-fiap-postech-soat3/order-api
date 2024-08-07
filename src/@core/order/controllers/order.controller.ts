import { Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/application-result/application-result';
import { ApplicationResultEvents } from '../../application/application-result/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { IOrderController } from './order-controller.interface';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import {
  CreateOrderItemServiceDto,
  CreateOrderServiceDto,
  IOrderService,
} from '../services/order-service.interface';
import { OrderEntity } from '../entitites/order.entity';
import { CreateOrderApplicationResultError } from '../../application/application-result-error/create-order-error';
import { CreateOrderApplicationResultSuccess } from '../../application/application-result-success/create-order-success';
import { IProductService } from '../services/product-service.interface';
import { OrderNotFoundApplicationResultError } from '../../application/application-result-error/order-not-found';
import {
  CalculateOrderDto,
  CalculateOrderResponseDto,
} from '../dtos/calculate-order.dto';
import { CalculateOrderApplicationSuccess } from '../../application/application-result-success/calculate-order-response';
import { IOrderStrategy } from '../../application/contracts/order.strategy';

@Injectable()
export class OrderController implements IOrderController {
  constructor(
    private orderService: IOrderService,
    private productService: IProductService,
    private orderStrategy: IOrderStrategy<
      OrderEntity,
      ApplicationResult<string | OrderEntity>
    >,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<ApplicationResult<string | OrderEntity>> {
    const calculatedOrder = await this.calculateOrder(createOrderDto);
    const insertDto = this.mapInsertDto(
      createOrderDto,
      calculatedOrder.message as CalculateOrderResponseDto,
    );
    const createdOrder = await this.orderService.create(insertDto);
    if (createdOrder.status === ResultStatus.ERROR)
      return new CreateOrderApplicationResultError();
    return new CreateOrderApplicationResultSuccess(createdOrder.data);
  }

  private mapInsertDto(
    createOrderDto: CreateOrderDto,
    calculatedOrder: CalculateOrderResponseDto,
  ): CreateOrderServiceDto {
    return {
      customerId: createOrderDto.customerId,
      items: calculatedOrder.products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      })) as CreateOrderItemServiceDto[],
      price: calculatedOrder.totalPrice as number,
    };
  }

  async calculateOrder(
    calculateOrderDto: CalculateOrderDto,
  ): Promise<ApplicationResult<CalculateOrderResponseDto>> {
    const mappedProductPriceDto = calculateOrderDto.items.map((item) => ({
      id: item.productId,
      quantity: item.quantity,
    }));

    const retrievedProducts =
      await this.productService.retrievePriceOfProductsInTotalAndPerUnit({
        products: mappedProductPriceDto,
      });

    return new CalculateOrderApplicationSuccess(retrievedProducts.data);
  }

  async findAll() {
    return this.orderService.findAll();
  }

  async findOne(id: string) {
    const order = await this.orderService.findOne(id);
    if (order.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Order not found',
      );
    }
    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS_CREATED,
      order as unknown as OrderEntity,
    );
  }

  async update(
    id: string,
    updateOrderDto: UpdateOrderDto,
  ): Promise<ApplicationResult<string | OrderEntity>> {
    const orderResult = await this.orderService.findOne(id);
    if (orderResult.status === ResultStatus.ERROR) {
      return new OrderNotFoundApplicationResultError();
    }

    const orderToUpdate = {
      ...orderResult.data,
      ...updateOrderDto,
    } as OrderEntity;

    return this.orderStrategy
      .makeHandler(orderToUpdate.status)
      .execute(orderToUpdate);
  }

  async remove(id: string) {
    return await this.orderService.remove(id);
  }

  async findAllOpen() {
    const orders = await this.orderService.findAllOpen();

    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS,
      orders as unknown as string,
    );
  }
}
