import { Injectable } from '@nestjs/common';
import { ApplicationResult } from '../../application/application-result/application-result';
import { Ctx, EventPattern, Payload, RmqContext } from '@nestjs/microservices';
import { CreateOrderApplicationResultError } from '../../application/application-result-error/create-order-error';

@Injectable()
export class PaymentConsumer {
  constructor() {}

  @EventPattern('PROCESS_PAYMENT_QUEUE')
  async processPayment(
    @Payload() data: string,
    @Ctx() context: RmqContext,
  ): Promise<ApplicationResult<string>> {
    const channel = context.getChannelRef();
    const originalMsg = context.getMessage();
    console.log('Received message:', data);
    // Confirma a mensagem como processada
    channel.ack(originalMsg);
    return new CreateOrderApplicationResultError();
  }
}
