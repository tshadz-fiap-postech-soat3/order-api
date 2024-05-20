import { IStrategy } from 'src/@core/application/model/strategy';
import {
  IOrderCancelledStrategy,
  IOrderConcludedStrategy,
  IOrderConfirmedStrategy,
  IOrderInProcessingStrategy,
  IOrderPlacedStrategy,
  IOrderReadyToPickupStrategy,
  IOrderStrategy,
} from '../../application/contracts/order.strategy';
import { OrderStatus } from '../enums/order-status.enum';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../entitites/order.entity';
import { ApplicationResult } from '../../application/application-result/application-result';
import { ProviderMaker } from '../../application/utils/provider-maker';

@Injectable()
export class OrderStrategy
  implements
    IOrderStrategy<OrderEntity, ApplicationResult<string | OrderEntity>>
{
  private readonly availableHandlersByStatus = {
    [OrderStatus.PAYMENT_DUE]: this.orderPlacedStrategy,
    [OrderStatus.PLACED]: this.orderPlacedStrategy,
    [OrderStatus.CONFIRMED]: this.orderConfirmedStrategy,
    [OrderStatus.PROCESSING]: this.orderInProcessingStrategy,
    [OrderStatus.READY_TO_PICKUP]: this.orderReadyToPickupStrategy,
    [OrderStatus.CONCLUDED]: this.orderConcludedStrategy,
    [OrderStatus.CANCELLED]: this.orderCancelledStrategy,
  };

  constructor(
    private readonly orderPlacedStrategy: IOrderPlacedStrategy<
      OrderEntity,
      ApplicationResult<string | OrderEntity>
    >,
    private readonly orderConfirmedStrategy: IOrderConfirmedStrategy<
      OrderEntity,
      ApplicationResult<string | OrderEntity>
    >,
    private readonly orderInProcessingStrategy: IOrderInProcessingStrategy<
      OrderEntity,
      ApplicationResult<string | OrderEntity>
    >,
    private readonly orderReadyToPickupStrategy: IOrderReadyToPickupStrategy<
      OrderEntity,
      ApplicationResult<string | OrderEntity>
    >,
    private readonly orderConcludedStrategy: IOrderConcludedStrategy<
      OrderEntity,
      ApplicationResult<string | OrderEntity>
    >,
    private readonly orderCancelledStrategy: IOrderCancelledStrategy<
      OrderEntity,
      ApplicationResult<string | OrderEntity>
    >,
  ) {}

  private chooseOrderHandler(
    orderStatus: OrderStatus,
  ): IStrategy<OrderEntity, ApplicationResult<string | OrderEntity>> {
    return this.availableHandlersByStatus[orderStatus];
  }

  makeHandler(
    orderStatus: OrderStatus,
  ): IStrategy<OrderEntity, ApplicationResult<string | OrderEntity>> {
    return this.chooseOrderHandler(orderStatus);
  }
}

export const OrderStrategyProvider = ProviderMaker.make(
  IOrderStrategy,
  OrderStrategy,
);
