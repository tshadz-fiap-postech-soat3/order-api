import { Inject, Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/application-result/application-result';
import { ApplicationResultEvents } from '../../application/application-result/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { IOrdersController } from './iorders-controller';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import { IOrdersService } from '../iorders.service';
import { OrderEntity } from '../entitites/order';
import {
  CreateOrderApplicationResultError
} from '../../application/application-result-error/create-order-error';
import { CreateOrderApplicationResultSuccess } from '../../application/application-result-success/create-order-success';

@Injectable()
export class OrdersController implements IOrdersController {
  constructor(
    @Inject(IOrdersService)
    private ordersService: IOrdersService,
  ) {}

  async create(createOrderDto: CreateOrderDto): Promise<ApplicationResult<string | OrderEntity>> {
    const createdOrder = await this.ordersService.create(createOrderDto);
    if (createdOrder.status === ResultStatus.ERROR) return new CreateOrderApplicationResultError();
    return new CreateOrderApplicationResultSuccess( createdOrder.data);
  }

  async findAll() {
    return await this.ordersService.findAll();
  }

  async findOne(id: string) {
    const order = await this.ordersService.findOne(id);
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
    const order = await this.ordersService.findOne(id);
    if (order.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Order not found',
      );
    }
    const updatedOrder = await this.ordersService.update(id, updateOrderDto);
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
    return await this.ordersService.remove(id);
  }

  async findAllOpen() {
    const orders = await this.ordersService.findAllOpen();

    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS,
      orders as unknown as string,
    );
  }
}
