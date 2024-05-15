import { IStrategy } from 'src/@core/application/model/strategy';
import { IOrderPlacedStrategy, IOrderStrategy } from '../../application/contracts/order.strategy';
import { OrderStatus } from '../enums/order-status.enum';
import { Injectable } from '@nestjs/common';
import { OrderEntity } from '../entitites/order.entity';

@Injectable()
export class OrderStrategy implements IOrderStrategy {

  private readonly availableHandlersByStatus = {
    [OrderStatus.PAYMENT_DUE]: this.finishPaymentStrategy,
    [OrderStatus.PLACED]: this.makeOrderPaymentStrategy,
    [OrderStatus.CONFIRMED]: this.confirmOrderStrategy,
    [OrderStatus.PROCESSING]: this.processOrderStrategy,
    [OrderStatus.READY_TO_PICKUP]: this.placeOrderStrategy,
    [OrderStatus.CONCLUDED]: this.finishPaymentStrategy,
    [OrderStatus.CANCELLED]: this.finishPaymentStrategy,
  };

  constructor(
     private readonly makeOrderPaymentStrategy: IOrderPlacedStrategy<OrderEntity, void>,
     private readonly confirmOrderStrategy: IStrategy<OrderEntity, void>,
     private readonly processOrderStrategy: IStrategy<OrderEntity, void>,
     private readonly placeOrderStrategy: IStrategy<OrderEntity, void>,
     private readonly finishPaymentStrategy: IStrategy<OrderEntity, void>) {
  }

  private chooseOrderHandler(orderStatus: OrderStatus): IStrategy<OrderEntity, void> {
    return this.availableHandlersByStatus[orderStatus];
  }

  makeHandler(orderStatus: OrderStatus): IStrategy<OrderEntity, void> {
    return this.chooseOrderHandler(orderStatus);
  }
}
