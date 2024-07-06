import { Inject, Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../application/applicationResult/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { IOrdersController } from './iorders-controller';
import { CreateOrderDto } from '../entitites/create-order.dto';
import { UpdateOrderDto } from '../entitites/update-order.dto';
import { IOrdersService } from '../iorders.service';
import { OrderEntity } from '../entitites/order';

@Injectable()
export class OrdersController implements IOrdersController {
  constructor(
    @Inject(IOrdersService)
    private ordersService: IOrdersService,
  ) {}

  async create(createOrderDto: CreateOrderDto) {
    const createdOrder = await this.ordersService.create(createOrderDto);
    if (createdOrder.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Not able to create the Order',
      );
    }
    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS_CREATED,
      createdOrder as unknown as string,
    );
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

  async update(id: string, updateOrderDto: UpdateOrderDto) {
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
