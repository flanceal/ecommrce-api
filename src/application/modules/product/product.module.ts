import { Module } from '@nestjs/common';
import ProductFromDBMapper from '../../../infrastructure/mapper/prisma.mapper';
import ProductAdapter from '../../../infrastructure/prisma/product.prisma.adapter';
import ProvidersConstants from '../../constraints/providers.constraints';
import { PrismaService } from '../../services/prisma/prisma.service';
import { ProductService } from '../../services/product/product.service';
import { ProductController } from './product.controller';

@Module({
  providers: [
    ProductService,
    {
      provide: ProvidersConstants.PRODUCT_REPOSITORY,
      useFactory: () =>
        new ProductAdapter(new PrismaService(), new ProductFromDBMapper()),
    },
  ],
  controllers: [ProductController],
})
export class ProductModule {}
