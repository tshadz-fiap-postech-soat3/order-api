import { Module } from '@nestjs/common';
import { OrdersModule } from './@core/order/orders.module';
import { DatabaseModule } from './external/driven/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';
import { OrderItemsModule } from './@core/order-item/order-items.module';
import { PubSubModule } from './external/driven/infra/pubsub/config/pubsub.module';

@Module({
  imports: [
    OrdersModule,
    DatabaseModule,
    ConfigModule.forRoot(),
    OrderItemsModule,
    PubSubModule,
  ],
})
export class AppModule {}
