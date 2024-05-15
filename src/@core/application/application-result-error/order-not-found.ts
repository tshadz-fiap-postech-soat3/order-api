import {ApplicationResult} from "../application-result/application-result";
import {ApplicationResultEvents} from "../application-result/application-result-events";

export class OrderNotFoundApplicationResultError extends ApplicationResult {
  constructor() {
    super(ApplicationResultEvents.ERROR, 'Order not found');
  }
}
