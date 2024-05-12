import { BaseEntity } from '../../application/model/base-entity';

export class OrderEntity extends BaseEntity{

  status: OrderStatus;
  customerId: string;
  price: number;

  constructor(id: string, customerId: string, price: number) {
    super(id)
    this.status = OrderStatus.PAYMENT_DUE;
    this.customerId = customerId;
    this.price = price;

  }

  isPlaced(): boolean {
    this.updatedAtDate = new Date();
    return this.status === OrderStatus.PLACED;
  }

  isConfirmed(): boolean {
    this.updatedAtDate = new Date();
    return this.status === OrderStatus.CONFIRMED;
  }

  isProcessing(): boolean {
    this.updatedAtDate = new Date();
    return this.status === OrderStatus.PROCESSING;
  }

  isReady(): boolean {
    this.updatedAtDate = new Date();
    return this.status === OrderStatus.READY_TO_PICKUP;
  }

  isConcluded(): boolean {
    this.updatedAtDate = new Date();
    return this.status === OrderStatus.CONCLUDED;
  }

  isCancelled(): boolean {
    this.updatedAtDate = new Date();
    return this.status === OrderStatus.CANCELLED;
  }
}

export enum OrderStatus {
  PAYMENT_DUE = '5. Aguardando Pagamento',
  PLACED = '4. Pagamento realizado e aguardando confirmação',
  CONFIRMED = '3. Pedido confirmado e aguardando preparo',
  PROCESSING = '2. Em Preparo',
  READY_TO_PICKUP = '1. Pronto para entrega',
  CONCLUDED = '6. Pedido entregue e finalizado',
  CANCELLED = '7. Pedido Cancelado',
}
