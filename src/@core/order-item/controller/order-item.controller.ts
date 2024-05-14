import { Inject, Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/applicationResult/application-result';
import { ApplicationResultEvents } from '../../application/applicationResult/application-result-events';
import { ResultStatus } from '../../application/result/result-status';
import { IOrderItemsController } from './iorder-item-controller';
import { CreateOrderItemDto } from '../entitites/create-order-item.dto';
import { UpdateOrderItemDto } from '../entitites/update-order-item.dto';
import { IOrderItemsService } from '../iorderItems.service';

@Injectable()
export class OrderItemsController implements IOrderItemsController {
  constructor(
    @Inject(IOrderItemsService)
    private orderItemsService: IOrderItemsService,
  ) {}

  async create(createOrderItemDto: CreateOrderItemDto[]) {
    const orderItems = await this.orderItemsService.create(createOrderItemDto);
    if (orderItems.status === ResultStatus.ERROR) {
      return new ApplicationResult(
        ApplicationResultEvents.ERROR,
        'Not able to create the order item',
      );
    }
    return new ApplicationResult(
      ApplicationResultEvents.SUCCESS_CREATED,
      orderItems as unknown as string,
    );
  }

  async findAll() {
    return await this.orderItemsService.findAll();
  }

  async findOne(category: string) {
    return await this.orderItemsService.findOne(category);
  }

  async update(id: string, updateOrderItemDto: UpdateOrderItemDto) {
    return await this.orderItemsService.update(id, updateOrderItemDto);
  }

  async remove(id: string) {
    return await this.orderItemsService.remove(id);
  }
}
