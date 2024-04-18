import { Result } from '../application/result/result';
import { UpdateProductDto } from '../products/entities/update-product.dto';
import { CreateOrderItemDto } from './entitites/create-order-item.dto';
import { OrderItemEntity } from './entitites/order-item';

export abstract class IOrderItemsService {
  public abstract create(
    product: CreateOrderItemDto[],
  ): Promise<Result<OrderItemEntity[]>>;
  public abstract update(
    id: string,
    product: UpdateProductDto,
  ): Promise<Result<OrderItemEntity>>;
  public abstract findOne(category: string): Promise<Result<OrderItemEntity>>;
  public abstract findOne(name: string): Promise<Result<OrderItemEntity>>;
  public abstract findAll(): Promise<Result<OrderItemEntity[]>>;
  public abstract remove(id: string): Promise<void>;
}
