import { IOrderCancelledStrategy } from '../../../application/contracts/order.strategy';
import { OrderEntity } from '../../entitites/order.entity';
import { ProviderMaker } from '../../../application/utils/provider-maker';

export class OrderCancelledStrategy implements IOrderCancelledStrategy<OrderEntity, void> {
    execute(args: OrderEntity, session?: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}

export const OrderCancelledStrategyProvider = ProviderMaker.make(IOrderCancelledStrategy, OrderCancelledStrategy);
