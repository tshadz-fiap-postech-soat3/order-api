import { Module } from '@nestjs/common';
import { OrderModule } from './@core/order/order.module';
import { DatabaseModule } from './external/driven/infra/database/database.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    OrderModule,
    DatabaseModule,
    ConfigModule.forRoot()
  ],
})
export class AppModule {}
