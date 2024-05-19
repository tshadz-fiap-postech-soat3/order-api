import { Module } from '@nestjs/common';
import { OrdersApi } from '../../external/driver/orders.api';
import { InfraModule } from '../../external/driven/infra/infra.module';
import { OrderServiceProvider } from './services/order-service.provider';
import { OrderControllerProvider } from './controllers/order-controller.provider';
import { OrderStrategiesModule } from './services/order-strategies/order-strategies.module';
import { ProductServiceProvider } from './services/product-service.provider';

@Module({
  imports: [InfraModule, OrderStrategiesModule],
  controllers: [OrdersApi],
  providers: [
    OrderServiceProvider,
    ProductServiceProvider,
    OrderControllerProvider,
  ],
})
export class OrderModule {}
