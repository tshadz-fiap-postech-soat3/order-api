import { Module } from '@nestjs/common';
import { InfraModule } from '../../../../external/driven/infra/infra.module';
import { OrderPlacedStrategyProvider } from './order-placed.strategy';

@Module({
  imports: [InfraModule],
  controllers: [],
  providers: [OrderPlacedStrategyProvider],
  exports: [OrderPlacedStrategyProvider]
})
export class OrderStrategiesModule {}
