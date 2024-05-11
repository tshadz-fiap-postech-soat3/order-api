import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity, OrderStatus } from '../entitites/order';
import {CreateOrderItemDto} from "../order-item/dtos/order-item/create-order-item.dto";

export class CreateOrderDto extends OrderEntity {
  @ApiProperty({ example: 'order-7' })
  id: string;

  @ApiProperty({ example: OrderStatus.PAYMENT_DUE })
  status: OrderStatus;

  @ApiProperty({ example: 'cust-1' })
  customerId: string;

  @ApiProperty({ example: 100 })
  price: number;

  @ApiProperty()
  items: CreateOrderItemDto[]
}
