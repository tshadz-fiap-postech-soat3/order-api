import { Module } from '@nestjs/common';
import { OrderModule } from './@core/order/order.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';
import { HealthController } from './health.controller';

@Module({
  controllers: [HealthController],
  imports: [ConfigModule.forRoot(), EventEmitterModule.forRoot(), OrderModule],
})
export class AppModule {}
