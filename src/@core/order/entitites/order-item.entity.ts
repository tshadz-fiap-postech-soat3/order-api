import { BaseEntity } from '../../application/model/base-entity';

export class OrderItemEntity extends BaseEntity {
  orderId: string;
  productId: string;
  quantity: number;

  constructor(orderId: string, productId: string, quantity: number) {
    super();
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
  }
}
