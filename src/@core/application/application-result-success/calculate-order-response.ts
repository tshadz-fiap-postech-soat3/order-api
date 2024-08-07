import { ApplicationResult } from '../application-result/application-result';
import { ApplicationResultEvents } from '../application-result/application-result-events';
import { OrderEntity } from '../../order/entitites/order.entity';
import { RetrievePriceOfProductsInTotalAndPerUnitResponseDto } from '../../order/services/product-service.interface';
import { CalculateOrderResponseDto } from '../../order/dtos/calculate-order.dto';

export class CalculateOrderApplicationSuccess extends ApplicationResult<CalculateOrderResponseDto> {
  constructor(orderTotal: CalculateOrderResponseDto) {
    super(ApplicationResultEvents.SUCCESS, orderTotal);
  }
}
