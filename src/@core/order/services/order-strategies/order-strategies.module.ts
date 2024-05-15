import { Module } from '@nestjs/common';
import { InfraModule } from '../../../../external/driven/infra/infra.module';
import { OrderPlacedStrategyProvider } from './order-placed.strategy';
import { OrderConfirmedStrategyProvider } from './order-confirmed.strategy';
import { OrderInProcessingStrategyProvider } from './order-in-processing.strategy';
import { OrderCancelledStrategyProvider } from './order-cancelled.strategy';
import { OrderConcludedStrategyProvider } from './order-concluded.strategy';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [OrderPlacedStrategyProvider, OrderConfirmedStrategyProvider, OrderConcludedStrategyProvider, OrderInProcessingStrategyProvider, OrderCancelledStrategyProvider],
  exports: [OrderPlacedStrategyProvider, OrderConfirmedStrategyProvider, OrderConcludedStrategyProvider, OrderInProcessingStrategyProvider, OrderCancelledStrategyProvider]
})
export class OrderStrategiesModule {}
