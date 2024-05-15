import { Module } from '@nestjs/common';
import { InfraModule } from '../../../../external/driven/infra/infra.module';
import { OrderPlacedStrategyProvider } from './order-placed.strategy';
import { OrderConfirmedStrategyProvider } from './order-confirmed.strategy';
import { OrderInProcessingStrategyProvider } from './order-in-processing';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [OrderPlacedStrategyProvider, OrderConfirmedStrategyProvider, OrderInProcessingStrategyProvider],
  exports: [OrderPlacedStrategyProvider, OrderConfirmedStrategyProvider, OrderInProcessingStrategyProvider]
})
export class OrderStrategiesModule {}
