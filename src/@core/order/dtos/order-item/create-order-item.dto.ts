import { ApiProperty } from '@nestjs/swagger';
export class CreateOrderItemDto {
  @ApiProperty({ example: 'prod-1' })
  productId: string;

  @ApiProperty({ example: 2 })
  quantity: number;
}
