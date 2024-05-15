import { IOrderConcludedStrategy } from '../../../application/contracts/order.strategy';
import { OrderEntity } from '../../entitites/order.entity';
import { ProviderMaker } from '../../../application/utils/provider-maker';

export class OrderConcludedStrategy implements IOrderConcludedStrategy<OrderEntity, void> {
  execute(args: OrderEntity, session?: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const OrderConcludedStrategyProvider = ProviderMaker.make(IOrderConcludedStrategy, OrderConcludedStrategy);
