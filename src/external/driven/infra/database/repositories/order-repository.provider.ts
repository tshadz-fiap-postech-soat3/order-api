import { ProviderMaker } from '../../../../../@core/application/utils/provider-maker';
import { IOrderRepository } from '../../../../../@core/order/repositories/order-repository.interface';
import { OrderRepository } from './order-repository';

export const OrderRepositoryProvider = ProviderMaker.make(IOrderRepository, OrderRepository);
