import { PartialType } from '@nestjs/mapped-types';
import { ApiProperty } from '@nestjs/swagger';
import { CreateOrderDto } from './create-order.dto';
import { OrderStatus } from '../enums/order-status.enum';

export class UpdateOrderDto extends PartialType(CreateOrderDto) {
  @ApiProperty({ example: 'Aguardando Pagamento' })
  status?: OrderStatus;

  @ApiProperty({ example: 'cust-1' })
  customerId?: string;

  @ApiProperty({ example: 100 })
  price?: number;

  constructor() {
    super({ updatedAtDate: new Date() });
  }
}
