import { ApplicationResult } from '../../application/application-result/application-result';
import { Result } from '../../application/result/result';
import { CreateOrderDto } from '../dtos/create-order.dto';
import { OrderEntity } from '../entitites/order.entity';
import { UpdateOrderDto } from '../dtos/update-order.dto';
import {
  CalculateOrderDto,
  CalculateOrderResponseDto,
} from '../dtos/calculate-order.dto';

export abstract class IOrderController {
  public abstract create(
    order: CreateOrderDto,
  ): Promise<ApplicationResult<OrderEntity | string>>;
  public abstract update(
    id: string,
    order: UpdateOrderDto,
  ): Promise<ApplicationResult<OrderEntity | string>>;
  public abstract calculateOrder(
    calculateOrderDto: CalculateOrderDto,
  ): Promise<ApplicationResult<CalculateOrderResponseDto>>;
  public abstract findOne(
    name: string,
  ): Promise<ApplicationResult<OrderEntity | string>>;
  public abstract findAll(): Promise<Result<OrderEntity[]>>;
  public abstract remove(id: string): Promise<void>;
  public abstract findAllOpen(): Promise<
    ApplicationResult<OrderEntity | string>
  >;
}
