
import { IOrderConfirmedStrategy, IOrderPlacedStrategy } from '../../../application/contracts/order.strategy';
import { OrderEntity } from '../../entitites/order.entity';
import { ProviderMaker } from '../../../application/utils/provider-maker';

export class OrderConfirmedStrategy implements IOrderConfirmedStrategy<OrderEntity, void> {
  execute(args: OrderEntity, session?: any): Promise<void> {
    throw new Error('Method not implemented.');
  }

}


export const OrderConfirmedStrategyProvider = ProviderMaker.make(IOrderConfirmedStrategy, OrderConfirmedStrategy);
