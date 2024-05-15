import { IOrderPlacedStrategy } from '../../../application/contracts/order.strategy';
import { OrderEntity } from '../../entitites/order.entity';
import { ProviderMaker } from '../../../application/utils/provider-maker';
import { EventEmitter2 } from '@nestjs/event-emitter';
import { OrderWasPlacedEvent } from '../../events/order-was-placed.event';

export class OrderPlacedStrategy implements IOrderPlacedStrategy<OrderEntity, void> {
  constructor(private eventEmitter: EventEmitter2) {}
  async execute(order: OrderEntity, session?: any): Promise<void> {
    this.eventEmitter.emit("order.status.placed", new OrderWasPlacedEvent(order))
  }

}


export const OrderPlacedStrategyProvider = ProviderMaker.make(IOrderPlacedStrategy, OrderPlacedStrategy);
