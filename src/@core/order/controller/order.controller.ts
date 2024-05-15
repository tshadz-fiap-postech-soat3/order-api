import { Inject, Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/application-result/application-result';
import { ApplicationResultEvents } from '../../application/application-result/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { OrderControllerInterface } from './order-controller.interface';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { IOrderService } from '../services/order-service.interface';
import { OrderEntity } from '../entitites/order.entity';
import {
  CreateOrderApplicationResultError
} from '../../application/application-result-error/create-order-error';
import { CreateOrderApplicationResultSuccess } from '../../application/application-result-success/create-order-success';
import { ProductEntity } from '../entitites/product.entity';
import { IProductService } from '../services/product-service.interface';
import {
  CalculateOrderApplicationSuccess
} from '../../application/application-result-success/calculate-order-response';

@Injectable()
export class OrderController implements OrderControllerInterface {
  constructor(
    @Inject(IOrderService)
    private orderService: IOrderService,
    @Inject(IProductService)
    private productService: IProductService
  ) {
  }

  async create(createOrderDto: CreateOrderDto): Promise<ApplicationResult<string | OrderEntity>> {
    const createdOrder = await this.orderService.create(createOrderDto);
    if (createdOrder.status === ResultStatus.ERROR) return new CreateOrderApplicationResultError();
    return new CreateOrderApplicationResultSuccess( createdOrder.data);
  }

  async calculateOrder(products: ProductEntity[]): Promise<ApplicationResult<number>>  {
    const totalProducts = await this.productService.calculateTotalPrice(products);
    return new CalculateOrderApplicationSuccess(totalProducts.data) ;
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

  async update(id: string, updateOrderDto: UpdateOrderDto): Promise<ApplicationResult<string| OrderEntity>> {
    const order = await this.orderService.findOne(id);
    if (order.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Order not found',
      );
    }
    const updatedOrder = await this.orderService.update(id, updateOrderDto);
    if (updatedOrder.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Not able to create the Order',
      );
    }

    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS_CREATED,
      updatedOrder as unknown as string,
    );
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
