import { ProviderMaker } from '../../application/utils/provider-maker';
import { IOrderRepository } from './order-repository.interface';
import { OrderRepository } from './order-repository';

export const OrderRepositoryProvider = ProviderMaker.make(IOrderRepository, OrderRepository);
