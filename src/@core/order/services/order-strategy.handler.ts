import { IStrategy } from 'src/@core/application/model/strategy';
import { IOrderStrategy } from '../../application/contracts/order.strategy';
import { OrderStatus } from '../enums/order-status.enum';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OrderStrategy implements IOrderStrategy {

  private readonly availableHandlersByStatus = {
    [OrderStatus.PAYMENT_DUE]: this.createOrderStrategy,
    [OrderStatus.PLACED]: this.makeOrderPaymentStrategy,
    [OrderStatus.CONFIRMED]: this.confirmOrderStrategy,
    [OrderStatus.PROCESSING]: this.processOrderStrategy,
    [OrderStatus.READY_TO_PICKUP]: this.placeOrderStrategy,
    [OrderStatus.CONCLUDED]: this.finishPaymentStrategy,
    [OrderStatus.CANCELLED]: this.finishPaymentStrategy,
  };

  constructor(
     private readonly createOrderStrategy: IStrategy<void, void>,
     private readonly makeOrderPaymentStrategy: IStrategy<void, void>,
     private readonly confirmOrderStrategy: IStrategy<void, void>,
     private readonly processOrderStrategy: IStrategy<void, void>,
     private readonly placeOrderStrategy: IStrategy<void, void>,
     private readonly finishPaymentStrategy: IStrategy<void, void>) {
  }

  private chooseOrderHandler(orderStatus: OrderStatus): IStrategy<any, void> {
    return this.availableHandlersByStatus[orderStatus];
  }

  makeHandler(orderStatus: OrderStatus): IStrategy<any, void> {
    return this.chooseOrderHandler(orderStatus);
  }
}
