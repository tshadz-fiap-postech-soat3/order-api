import {ApplicationResult} from "../applicationResult/application-result";
import {ApplicationResultEvents} from "../applicationResult/application-result-events";

export class CreateOrderError extends ApplicationResult {
  constructor() {
    super(ApplicationResultEvents.ERROR, 'Not able to create the Order');
  }
}
