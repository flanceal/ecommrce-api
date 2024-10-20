import { Module } from '@nestjs/common';
import { ProductModule } from './application/modules/product/product.module';
import { CartModule } from './cart/cart.module';

@Module({
  imports: [ProductModule, CartModule],
})
export class AppModule {}
