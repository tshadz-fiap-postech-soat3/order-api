import { BaseEntity } from '../../application/model/base-entity';
import { OrderStatus } from '../enums/order-status.enum';

export class OrderEntity extends BaseEntity {

  status: OrderStatus;
  customerId: string;
  price: number;

  constructor(id: string, customerId: string, price: number) {
    super(id)
    this.status = OrderStatus.PAYMENT_DUE;
    this.customerId = customerId;
    this.price = price;

  }

  changeStatus(status: OrderStatus): OrderEntity {
    const isValidStatus = Object.values(OrderStatus).some((s) => s === status);
    if (!isValidStatus) throw "Invalid Order Status"
    this.updateDate();
    this.status = status;
    return this
  }

  isPlaced(): boolean {
    return this.status === OrderStatus.PLACED;
  }

  isConfirmed(): boolean {
    return this.status === OrderStatus.CONFIRMED;
  }

  isProcessing(): boolean {
    return this.status === OrderStatus.PROCESSING;
  }

  isReady(): boolean {
    return this.status === OrderStatus.READY_TO_PICKUP;
  }

  isConcluded(): boolean {
    return this.status === OrderStatus.CONCLUDED;
  }

  isCancelled(): boolean {
    return this.status === OrderStatus.CANCELLED;
  }
}

