import { Module } from '@nestjs/common';
import { ProductModule } from './application/modules/product/product.module';

@Module({
  imports: [ProductModule],
})
export class AppModule {}
