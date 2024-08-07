import { IOrderPlacedStrategy } from '../../../application/contracts/order.strategy';
import { OrderEntity } from '../../entitites/order.entity';
import { ProviderMaker } from '../../../application/utils/provider-maker';
import { ResultStatus } from '../../../application/result/result-status';
import { UpdateOrderApplicationResultError } from '../../../application/application-result-error/update-order-error';
import { UpdateOrderApplicationResultSuccess } from '../../../application/application-result-success/update-order-success';
import { ApplicationResult } from '../../../application/application-result/application-result';
import { IOrderService } from '../order-service.interface';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderPlacedStrategy
  implements
    IOrderPlacedStrategy<OrderEntity, ApplicationResult<string | OrderEntity>>
{
  constructor(private orderService: IOrderService) {}
  async execute(
    orderToUpdate: OrderEntity,
  ): Promise<ApplicationResult<string | OrderEntity>> {
    const order = new OrderEntity(orderToUpdate.price, orderToUpdate.customerId)
      .changeStatus(orderToUpdate.status)
      .setId(orderToUpdate.id);

    const updatedOrder = await this.orderService.update(order.id, order);

    if (updatedOrder.status === ResultStatus.ERROR) {
      return new UpdateOrderApplicationResultError();
    }

    return new UpdateOrderApplicationResultSuccess(updatedOrder.data);
  }
}

export const OrderPlacedStrategyProvider = ProviderMaker.make(
  IOrderPlacedStrategy,
  OrderPlacedStrategy,
);
