import { ApplicationResult } from '../../application/applicationResult/application-result';
import { Result } from '../../application/result/result';
import { CreateOrderItemDto } from '../entitites/create-order-item.dto';
import { OrderItemEntity } from '../entitites/order-item';
import { UpdateOrderItemDto } from '../entitites/update-order-item.dto';

export abstract class IOrderItemsController {
  public abstract create(
    OrdemItems: CreateOrderItemDto[],
  ): Promise<ApplicationResult<any>>;
  public abstract update(
    id: string,
    OrdemItems: UpdateOrderItemDto,
  ): Promise<Result<OrderItemEntity>>;
  public abstract findOne(name: string): Promise<Result<OrderItemEntity>>;
  public abstract findAll(): Promise<Result<OrderItemEntity[]>>;
  public abstract remove(id: string): Promise<void>;
}
