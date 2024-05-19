import { ProductExternalProvider } from './services/product-external.provider';
import { Module } from '@nestjs/common';
import { DatabaseModule } from './database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [ProductExternalProvider],
  exports: [DatabaseModule, ProductExternalProvider],
})
export class InfraModule {}
