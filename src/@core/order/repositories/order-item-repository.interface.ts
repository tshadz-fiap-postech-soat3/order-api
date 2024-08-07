import { OrderItemEntity } from '../entitites/order-item.entity';

export abstract class IOrderItemRepository {
  public abstract insertMany(
    order: OrderItemEntity[],
  ): Promise<OrderItemEntity[]>;
  public abstract findByOrderId(id: string): Promise<OrderItemEntity[]>;
}
