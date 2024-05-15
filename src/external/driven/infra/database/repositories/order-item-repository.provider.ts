import { ProviderMaker } from '../../../../../@core/application/utils/provider-maker';
import { OrderItemRepository } from './order-item-repository';
import { IOrderItemRepository } from '../../../../../@core/order/repositories/order-item-repository.interface';

export const OrderItemRepositoryProvider = ProviderMaker.make(IOrderItemRepository, OrderItemRepository)
