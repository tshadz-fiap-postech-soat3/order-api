import { Result } from '../application/result/result';
import { CreateOrderItemDto } from './entitites/create-order-item.dto';
import { OrderItemEntity } from './entitites/order-item';
import { UpdateOrderItemDto } from './entitites/update-order-item.dto';

export abstract class IOrderItemsService {
  public abstract create(
    orderItem: CreateOrderItemDto[],
  ): Promise<Result<OrderItemEntity[]>>;
  public abstract update(
    id: string,
    orderItem: UpdateOrderItemDto,
  ): Promise<Result<OrderItemEntity>>;
  public abstract findOne(category: string): Promise<Result<OrderItemEntity>>;
  public abstract findOne(name: string): Promise<Result<OrderItemEntity>>;
  public abstract findAll(): Promise<Result<OrderItemEntity[]>>;
  public abstract remove(id: string): Promise<void>;
}
