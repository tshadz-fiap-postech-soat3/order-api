import { IOrderInProcessingStrategy } from '../../../application/contracts/order.strategy';
import { OrderEntity } from '../../entitites/order.entity';
import { ProviderMaker } from '../../../application/utils/provider-maker';
import { ApplicationResult } from '../../../application/application-result/application-result';
import { IOrderService } from '../order-service.interface';
import { OrderStatus } from '../../enums/order-status.enum';
import { ResultStatus } from '../../../application/result/result-status';
import { UpdateOrderApplicationResultError } from '../../../application/application-result-error/update-order-error';
import { UpdateOrderApplicationResultSuccess } from '../../../application/application-result-success/update-order-success';
import { Injectable } from '@nestjs/common';
@Injectable()
export class OrderInProcessingStrategy
  implements
    IOrderInProcessingStrategy<
      OrderEntity,
      ApplicationResult<string | OrderEntity>
    >
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

export const OrderInProcessingStrategyProvider = ProviderMaker.make(
  IOrderInProcessingStrategy,
  OrderInProcessingStrategy,
);
