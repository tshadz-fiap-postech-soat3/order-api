import { Module } from '@nestjs/common';
import { OrdersModule } from './@core/order/orders.module';
import { DatabaseModule } from './external/driven/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OrdersModule,
    DatabaseModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
