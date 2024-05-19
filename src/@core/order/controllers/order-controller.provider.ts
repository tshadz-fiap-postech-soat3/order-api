import { ProviderMaker } from '../../application/utils/provider-maker';
import { OrderController } from './order.controller';
import { IOrderController } from './order-controller.interface';

export const OrderControllerProvider = ProviderMaker.make(IOrderController, OrderController)
