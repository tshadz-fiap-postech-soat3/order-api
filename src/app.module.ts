import { Module } from '@nestjs/common';
import { OrderModule } from './@core/order/order.module';
import { DatabaseModule } from './external/driven/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';

@Module({
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    OrderModule,
    DatabaseModule
  ],
})
export class AppModule {}
