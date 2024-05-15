import { IEvent } from '../../application/model/event';
import { OrderEntity } from '../entitites/order.entity';
import { OnEvent } from '@nestjs/event-emitter';

export class OrderWasPlacedEvent implements IEvent<OrderEntity, void> {
  constructor(private readonly orderEntity: OrderEntity) {
  }
  @OnEvent('order.status.placed')
  execute(args: OrderEntity): Promise<void> {
      throw new Error('Method not implemented.');
  }

}
