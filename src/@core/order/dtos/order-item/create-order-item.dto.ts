import { ApiProperty } from '@nestjs/swagger';
import { OrderItemEntity } from '../../entitites/order-item.entity';

export class CreateOrderItemDto extends OrderItemEntity {
  @ApiProperty({ example: 'prod-1' })
  productId: string;

  @ApiProperty({ example: 2 })
  quantity: number;
}
