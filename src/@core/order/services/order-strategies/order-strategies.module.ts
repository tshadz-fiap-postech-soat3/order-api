import { Module } from '@nestjs/common';
import { InfraModule } from '../../../../external/driven/infra/infra.module';
import { OrderPlacedStrategyProvider } from './order-placed.strategy';
import { OrderConfirmedStrategyProvider } from './order-confirmed.strategy';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [OrderPlacedStrategyProvider, OrderConfirmedStrategyProvider],
  exports: [OrderPlacedStrategyProvider, OrderConfirmedStrategyProvider]
})
export class OrderStrategiesModule {}
