import {ApplicationResult} from "../application-result/application-result";
import {ApplicationResultEvents} from "../application-result/application-result-events";
import { OrderEntity } from '../../order/entitites/order.entity';

export class CalculateOrderApplicationSuccess extends ApplicationResult<number> {
  constructor(orderTotal: number) {
    super(ApplicationResultEvents.SUCCESS, orderTotal);
  }
}
