import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderItemDto } from './order-item/create-order-item.dto';
import { ProductEntity } from '../entitites/product.entity';

export class CalculateOrderDto {
  @ApiProperty()
  items: CreateOrderItemDto[];
}

export class CalculateOrderResponseDto {
  @ApiProperty()
  totalPrice: number;

  @ApiProperty()
  products: ProductEntity[];
}
