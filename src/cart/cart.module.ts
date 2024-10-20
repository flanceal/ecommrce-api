import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import ProvidersConstants from '../application/constraints/providers.constraints';
import { PrismaService } from '../application/services/prisma/prisma.service';
import CartAdapter from '../infrastructure/prisma/cart.prisma.adapter';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';

@Module({
  providers: [
    CartService,
    ConfigService,
    {
      provide: ProvidersConstants.CART_REPOSITORY,
      useFactory: () => new CartAdapter(new PrismaService()),
    },
  ],
  controllers: [CartController],
})
export class CartModule {}
