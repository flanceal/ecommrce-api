import { Module } from '@nestjs/common';
import { ProductService } from '../../services/product/product.service';
import { ProductController } from './product.controller';

@Module({
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductModule {}
