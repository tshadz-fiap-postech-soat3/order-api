import {ApplicationResult} from "../application-result/application-result";
import {ApplicationResultEvents} from "../application-result/application-result-events";

export class CreateOrderApplicationResultError extends ApplicationResult {
  constructor() {
    super(ApplicationResultEvents.ERROR, 'Not able to create the Order');
  }
}
