import { ApiProperty } from '@nestjs/swagger';
import { OrderEntity } from '../entitites/order.entity';
import {CreateOrderItemDto} from "./order-item/create-order-item.dto";
import { OrderStatus } from '../enums/order-status.enum';

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
