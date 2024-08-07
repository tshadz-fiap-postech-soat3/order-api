import { Module } from '@nestjs/common';
import { OrdersApi } from '../../external/driver/orders.api';
import { InfraModule } from '../../external/driven/infra/infra.module';
import { OrderServiceProvider } from './services/order-service.provider';
import { OrderControllerProvider } from './controllers/order-controller.provider';
import { ProductServiceProvider } from './services/product-service.provider';
import { OrderPlacedStrategyProvider } from './services/order-strategies/order-placed.strategy';
import { OrderConfirmedStrategyProvider } from './services/order-strategies/order-confirmed.strategy';
import { OrderConcludedStrategyProvider } from './services/order-strategies/order-concluded.strategy';
import { OrderInProcessingStrategyProvider } from './services/order-strategies/order-in-processing.strategy';
import { OrderCancelledStrategyProvider } from './services/order-strategies/order-cancelled.strategy';
import { OrderReadyToPickupStrategyProvider } from './services/order-strategies/order-ready-to-pickup.strategy';
import { OrderStrategyProvider } from './services/order-strategy.handler';

@Module({
  imports: [InfraModule],
  controllers: [OrdersApi],
  providers: [
    OrderStrategyProvider,
    OrderServiceProvider,
    ProductServiceProvider,
    OrderControllerProvider,
    OrderPlacedStrategyProvider,
    OrderConfirmedStrategyProvider,
    OrderConcludedStrategyProvider,
    OrderInProcessingStrategyProvider,
    OrderCancelledStrategyProvider,
    OrderReadyToPickupStrategyProvider,
  ],
  exports: [
    OrderPlacedStrategyProvider,
    OrderConfirmedStrategyProvider,
    OrderConcludedStrategyProvider,
    OrderInProcessingStrategyProvider,
    OrderCancelledStrategyProvider,
    OrderReadyToPickupStrategyProvider,
    OrderStrategyProvider,
  ],
})
export class OrderModule {}
