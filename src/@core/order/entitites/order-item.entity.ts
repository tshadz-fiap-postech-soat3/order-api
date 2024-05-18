import { BaseEntity } from '../../application/model/base-entity';

export class OrderItemEntity extends BaseEntity {
  orderId: string;
  productId: string;
  quantity: number;
  price: number;

  constructor(
    orderId: string,
    productId: string,
    quantity: number,
    price: number,
  ) {
    super();
    this.orderId = orderId;
    this.productId = productId;
    this.quantity = quantity;
    this.price = price;
  }
}
