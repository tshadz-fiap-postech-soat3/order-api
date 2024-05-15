import { IStrategy } from 'src/@core/application/model/strategy';
import {
  IOrderCancelledStrategy,
  IOrderConcludedStrategy,
  IOrderConfirmedStrategy, IOrderInProcessingStrategy,
  IOrderPlacedStrategy, IOrderReadyToPickupStrategy,
  IOrderStrategy,
} from '../../application/contracts/order.strategy';
import { OrderStatus } from '../enums/order-status.enum';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../entitites/order.entity';

@Injectable()
export class OrderStrategy implements IOrderStrategy {

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
     private readonly orderPlacedStrategy: IOrderPlacedStrategy<OrderEntity, void>,
     private readonly orderConfirmedStrategy: IOrderConfirmedStrategy<OrderEntity, void>,
     private readonly orderInProcessingStrategy: IOrderInProcessingStrategy<OrderEntity, void>,
     private readonly orderReadyToPickupStrategy: IOrderReadyToPickupStrategy<OrderEntity, void>,
     private readonly orderConcludedStrategy: IOrderConcludedStrategy<OrderEntity, void>,
     private readonly orderCancelledStrategy: IOrderCancelledStrategy<OrderEntity, void>) {
  }

  private chooseOrderHandler(orderStatus: OrderStatus): IStrategy<OrderEntity, void> {
    return this.availableHandlersByStatus[orderStatus];
  }

  makeHandler(orderStatus: OrderStatus): IStrategy<OrderEntity, void> {
    return this.chooseOrderHandler(orderStatus);
  }
}
