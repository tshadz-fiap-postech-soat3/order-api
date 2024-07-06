import { CreateOrderItemDto } from '../entitites/create-order-item.dto';
import { UpdateOrderItemDto } from '../entitites/update-order-item.dto';
import { OrderItemEntity } from '../entitites/order-item';

export abstract class IOrderItemsRepository {
  public abstract insert(order: CreateOrderItemDto[]): Promise<OrderItemEntity[]>;
  public abstract update(
    id: string,
    order: UpdateOrderItemDto,
  ): Promise<OrderItemEntity>;
  public abstract findByOrderId(id: string): Promise<OrderItemEntity>;
  public abstract findAll(): Promise<OrderItemEntity[]>;
  public abstract delete(id: string): Promise<void>;
}
