export enum OrderStatus {
  PAYMENT_DUE = '1. Aguardando Pagamento',
  PLACED = '2. Pagamento realizado e aguardando confirmação',
  CONFIRMED = '3. Pedido confirmado e aguardando preparo',
  PROCESSING = '4. Em Preparo',
  READY_TO_PICKUP = '5. Pronto para entrega',
  CONCLUDED = '6. Pedido entregue e finalizado',
  CANCELLED = '7. Pedido Cancelado',
}
