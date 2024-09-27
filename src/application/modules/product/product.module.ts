import { Module } from '@nestjs/common';
import ProductAdapter from '../../../infrastructure/prisma/product.prisma.adapter';
import ProvidersConstants from '../../constraints/providers.constraints';
import { ProductService } from '../../services/product/product.service';
import { ProductController } from './product.controller';

@Module({
  providers: [
    ProductService,
    {
      provide: ProvidersConstants.PRODUCT_REPOSITORY,
      useClass: ProductAdapter,
    },
  ],
  controllers: [ProductController],
})
export class ProductModule {}
