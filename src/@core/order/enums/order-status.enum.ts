export enum OrderStatus {
  READY_TO_PICKUP = '1. Pronto para entrega',
  PROCESSING = '2. Em Preparo',
  CONFIRMED = '3. Pedido confirmado e aguardando preparo',
  PLACED = '4. Pagamento realizado e aguardando confirmação',
  PAYMENT_DUE = '5. Aguardando Pagamento',
  CONCLUDED = '6. Pedido entregue e finalizado',
  CANCELLED = '7. Pedido Cancelado',
}
