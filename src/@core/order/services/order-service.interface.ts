import { Result } from '../../application/result/result';
import { OrderEntity } from '../entitites/order.entity';

export class CreateOrderServiceDto {
  customerId: string;
  items: CreateOrderItemServiceDto[];
  price: number;
}

export class CreateOrderItemServiceDto {
  productId: string;
  quantity: number;
  price: number;
}
export abstract class IOrderService {
  public abstract create(
    order: CreateOrderServiceDto,
  ): Promise<Result<OrderEntity>>;
  public abstract update(
    id: string,
    order: OrderEntity,
  ): Promise<Result<OrderEntity>>;
  public abstract findOne(category: string): Promise<Result<OrderEntity>>;
  public abstract findAllByStatus(name: string): Promise<Result<OrderEntity[]>>;
  public abstract findAll(): Promise<Result<OrderEntity[]>>;
  public abstract remove(id: string): Promise<void>;
  public abstract findAllOpen(): Promise<Result<OrderEntity[]>>;
}
