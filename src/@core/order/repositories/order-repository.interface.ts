import { OrderEntity } from '../entitites/order.entity';
import { OrderStatus } from '../enums/order-status.enum';

export abstract class IOrderRepository {
  public abstract insert(order: OrderEntity): Promise<OrderEntity>;
  public abstract update(id: string, order: OrderEntity): Promise<OrderEntity>;
  public abstract findById(id: string): Promise<OrderEntity>;
  public abstract findAll(): Promise<OrderEntity[]>;
  public abstract findAllByStatus(status: OrderStatus): Promise<OrderEntity[]>;
  public abstract delete(id: string): Promise<void>;
  public abstract findAllOpen(): Promise<OrderEntity[]>;
}
