import { CreateOrderItemDto } from '../dtos/order-item/create-order-item.dto';
import { UpdateOrderItemDto } from '../dtos/order-item/update-order-item.dto';
import { OrderItemEntity } from '../entitites/order-item';

export abstract class IOrderItemRepository {
  public abstract insert(order: CreateOrderItemDto[]): Promise<OrderItemEntity[]>;
  public abstract update(
    id: string,
    order: UpdateOrderItemDto,
  ): Promise<OrderItemEntity>;
  public abstract findByOrderId(id: string): Promise<OrderItemEntity>;
  public abstract findAll(): Promise<OrderItemEntity[]>;
  public abstract delete(id: string): Promise<void>;
}
