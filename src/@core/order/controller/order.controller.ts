import { Inject, Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/application-result/application-result';
import { ApplicationResultEvents } from '../../application/application-result/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { IOrderController } from './order-controller.interface';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { IOrderService } from '../services/order-service.interface';
import { OrderEntity } from '../entitites/order.entity';
import { CreateOrderApplicationResultError } from '../../application/application-result-error/create-order-error';
import { CreateOrderApplicationResultSuccess } from '../../application/application-result-success/create-order-success';
import { ProductEntity } from '../entitites/product.entity';
import { IProductService } from '../services/product-service.interface';
import { OrderStatus } from '../enums/order-status.enum';
import { OrderNotFoundApplicationResultError } from '../../application/application-result-error/order-not-found';
import { UpdateOrderApplicationResultError } from '../../application/application-result-error/update-order-error';
import { UpdateOrderApplicationResultSuccess } from '../../application/application-result-success/update-order-success';

@Injectable()
export class OrderController implements IOrderController {
  constructor(
    @Inject(IOrderService)
    private orderService: IOrderService,
    @Inject(IProductService)
    private productService: IProductService,
  ) {}

  async create(
    createOrderDto: CreateOrderDto,
  ): Promise<ApplicationResult<string | OrderEntity>> {
    const createdOrder = await this.orderService.create(createOrderDto);
    if (createdOrder.status === ResultStatus.ERROR)
      return new CreateOrderApplicationResultError();
    return new CreateOrderApplicationResultSuccess(createdOrder.data);
  }

  async calculateOrder(
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    products: ProductEntity[],
  ): Promise<ApplicationResult<number>> {
    throw new Error('Method not implemented');
    // const totalProducts =
    //   await this.productService.retrievePriceOfProductsInTotalAndPerUnit(
    //     products,
    //  );
    // return new CalculateOrderApplicationSuccess(totalProducts.data.totalPrice);
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
