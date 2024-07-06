import { Module } from '@nestjs/common';
import { PubSubClient } from '../pubsub.client';

@Module({
  providers: [PubSubClient],
  exports: [PubSubClient],
})
export class PubSubModule {}
