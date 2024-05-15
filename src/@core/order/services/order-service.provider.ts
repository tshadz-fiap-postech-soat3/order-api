import { ProviderMaker } from '../../application/utils/provider-maker';
import { IOrderService } from './order-service.interface';
import { OrderService } from './order.service';

export const OrderServiceProvider = ProviderMaker.make(IOrderService, OrderService)
