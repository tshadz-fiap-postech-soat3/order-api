import {ApplicationResult} from "../application-result/application-result";
import {ApplicationResultEvents} from "../application-result/application-result-events";
import { OrderEntity } from '../../order/entitites/order.entity';

export class UpdateOrderApplicationResultSuccess extends ApplicationResult<OrderEntity> {
  constructor(order: OrderEntity) {
    super(ApplicationResultEvents.SUCCESS_CREATED, order);
  }
}
