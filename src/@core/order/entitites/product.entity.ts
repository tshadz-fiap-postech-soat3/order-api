import { BaseEntity } from '../../application/model/base-entity';

export class ProductEntity extends BaseEntity {
  constructor(name: string, price: number, quantity: number) {
    super();
    this.name = name;
    this.price = price;
    this.quantity = quantity;
  }

  name: string;
  price: number;
  quantity: number;
}
