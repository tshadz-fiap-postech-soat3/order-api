import {ApplicationResult} from "../application-result/application-result";
import {ApplicationResultEvents} from "../application-result/application-result-events";
import { OrderEntity } from '../../order/entitites/order';

export class CreateOrderApplicationResultSuccess extends ApplicationResult<OrderEntity> {
  constructor(order: OrderEntity) {
    super(ApplicationResultEvents.SUCCESS_CREATED, order);
  }
}
