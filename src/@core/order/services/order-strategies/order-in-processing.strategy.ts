import { IOrderInProcessingStrategy } from '../../../application/contracts/order.strategy';
import { OrderEntity } from '../../entitites/order.entity';
import { ProviderMaker } from '../../../application/utils/provider-maker';

export class OrderInProcessingStrategy
  implements IOrderInProcessingStrategy<OrderEntity, void>
{
  execute(args: OrderEntity, session?: any): Promise<void> {
    throw new Error('Method not implemented.');
  }
}

export const OrderInProcessingStrategyProvider = ProviderMaker.make(
  IOrderInProcessingStrategy,
  OrderInProcessingStrategy,
);
