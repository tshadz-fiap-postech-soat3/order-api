import { CreateOrderDto } from '../../dtos/create-order.dto';
import { UpdateOrderDto } from '../../dtos/update-order.dto';
import { OrderEntity, OrderStatus } from '../../entitites/order';

export abstract class IOrdersRepository {
  public abstract insert(order: CreateOrderDto): Promise<OrderEntity>;
  public abstract update(id: string, order: UpdateOrderDto): Promise<OrderEntity>;
  public abstract findById(id: string): Promise<OrderEntity>;
  public abstract findAll(): Promise<OrderEntity[]>;
  public abstract findAllByStatus(status: OrderStatus): Promise<OrderEntity[]>;
  public abstract delete(id: string): Promise<void>;
  public abstract findAllOpen(): Promise<OrderEntity[]>;
}
