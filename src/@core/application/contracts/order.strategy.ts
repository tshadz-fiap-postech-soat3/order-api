import { OrderStatus } from '../../order/enums/order-status.enum';
import { IStrategy } from '../model/strategy';

export abstract class IOrderStrategy {
  abstract makeHandler(paymentStatus: OrderStatus): IStrategy<any, void>;
}
