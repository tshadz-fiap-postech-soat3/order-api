import { Inject, Injectable } from '@nestjs/common';
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
import { OrderStatus } from '../enums/order-status.enum';
import { OrderNotFoundApplicationResultError } from '../../application/application-result-error/order-not-found';
import { UpdateOrderApplicationResultError } from '../../application/application-result-error/update-order-error';
import { UpdateOrderApplicationResultSuccess } from '../../application/application-result-success/update-order-success';
import {
  CalculateOrderDto,
  CalculateOrderResponseDto,
} from '../dtos/calculate-order.dto';
import { CalculateOrderApplicationSuccess } from '../../application/application-result-success/calculate-order-response';

@Injectable()
export class OrderController implements IOrderController {
  constructor(
    private orderService: IOrderService,
    private productService: IProductService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<ApplicationResult<string | OrderEntity>> {
    const calculatedOrder = await this.calculateOrder(createOrderDto);
    const insertDto = this.mapInsertDto(createOrderDto, calculatedOrder);
    const createdOrder = await this.orderService.create(insertDto);
    if (createdOrder.status === ResultStatus.ERROR)
      return new CreateOrderApplicationResultError();
    return new CreateOrderApplicationResultSuccess(createdOrder.data);
  }

  private mapInsertDto(
    createOrderDto: CreateOrderDto,
    calculatedOrder: ApplicationResult<CalculateOrderResponseDto>,
  ): CreateOrderServiceDto {
    return {
      customerId: createOrderDto.customerId,
      items: calculatedOrder.message?.products.map((product) => ({
        productId: product.id,
        quantity: product.quantity,
        price: product.price,
      })) as CreateOrderItemServiceDto[],
      price: calculatedOrder.message?.totalPrice as number,
    };
  }

  async calculateOrder(
    calculateOrderDto: CalculateOrderDto,
  ): Promise<ApplicationResult<CalculateOrderResponseDto>> {
    const products = calculateOrderDto.items.map((item) => ({
      id: item.productId,
    }));
    const retrievedProducts =
      await this.productService.retrievePriceOfProductsInTotalAndPerUnit({
        products,
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
    const order = orderResult.data;
    order.changeStatus(updateOrderDto.status as OrderStatus);
    const updatedOrder = await this.orderService.update(id, order);

    if (updatedOrder.status === ResultStatus.ERROR) {
      return new UpdateOrderApplicationResultError();
    }

    return new UpdateOrderApplicationResultSuccess(updatedOrder.data);
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
