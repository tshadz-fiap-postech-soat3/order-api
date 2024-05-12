import { ApiProperty } from '@nestjs/swagger';
import { OrderItemEntity } from '../../entitites/order-item';

export class CreateOrderItemDto extends OrderItemEntity {
  @ApiProperty({ example: 'order-item-1' })
  id: string;

  @ApiProperty({ example: 'order-1' })
  orderId: string;

  @ApiProperty({ example: 'prod-1' })
  productId: string;

  @ApiProperty({ example: 2 })
  quantity: number;
}
