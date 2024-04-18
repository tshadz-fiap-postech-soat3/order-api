import { ApplicationResult } from '../../application/applicationResult/application-result';
import { Result } from '../../application/result/result';
import { CreateOrderDto } from '../entitites/create-order.dto';
import { OrderEntity } from '../entitites/order';
import { UpdateOrderDto } from '../entitites/update-order.dto';

export abstract class IOrdersController {
  public abstract create(
    product: CreateOrderDto,
  ): Promise<ApplicationResult<any>>;
  public abstract update(
    id: string,
    order: UpdateOrderDto,
  ): Promise<ApplicationResult<any>>;
  public abstract findOne(name: string): Promise<ApplicationResult<OrderEntity | string >>;
  public abstract findAll(): Promise<Result<OrderEntity[]>>;
  public abstract remove(id: string): Promise<void>;
  public abstract findAllOpen(): Promise<ApplicationResult<OrderEntity | string>>;
}
