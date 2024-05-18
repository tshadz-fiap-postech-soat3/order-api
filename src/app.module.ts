import { Controller, Get, Module } from '@nestjs/common';
import { OrderModule } from './@core/order/order.module';
import { ConfigModule } from '@nestjs/config';
import { EventEmitterModule } from '@nestjs/event-emitter';



@Controller('/health')
class HealthCheckerController {
  @Get('/check')
  async healthCheck(): Promise<string> {
    return 'App running';
  }
}


@Module({
  controllers: [HealthCheckerController],
  imports: [
    ConfigModule.forRoot(),
    EventEmitterModule.forRoot(),
    OrderModule,
  ],
})
export class AppModule {}
