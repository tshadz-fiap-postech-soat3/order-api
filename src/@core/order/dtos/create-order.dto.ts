import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from './order-item/create-order-item.dto';

export class CreateOrderDto {
  @ApiProperty({ example: 'cust-1' })
  customerId: string;

  @ApiProperty()
  items: CreateOrderItemDto[];
}
