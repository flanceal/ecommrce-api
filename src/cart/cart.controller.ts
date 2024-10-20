import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '../application/guards/auth/auth.guard';
import { CartGuard } from '../application/guards/cart/cart.guard';
import { ExtendedRequest } from '../application/types/extended.request';
import { CartService } from './cart.service';
import { AddProductToCartDto } from './dto/add-product-to-cart';

@UseGuards(AuthGuard, CartGuard)
@Controller('/api/v1/cart')
export class CartController {
  constructor(private readonly cartService: CartService) {}

  @Post()
  create(@Req() request: ExtendedRequest) {
    const userId = request['userId'];
    return this.cartService.createCart(userId);
  }

  @Get()
  getCartProducts(@Req() request: ExtendedRequest) {
    const userId = request['userId'];
    return this.cartService.getCartProducts(userId);
  }

  @Post(':productId')
  addProductToCart(
    @Param('productId') productId: string,
    @Body() addProductToCartDto: AddProductToCartDto,
    @Req() request: ExtendedRequest,
  ) {
    const userId = request['userId'];

    return this.cartService.addProductToCart(
      userId,
      addProductToCartDto.quantity,
      productId,
    );
  }

  @Delete(':productId')
  removeProductFromCart(
    @Param('productId') productId: string,
    @Req() request: ExtendedRequest,
  ) {
    const userId = request['userId'];
    return this.cartService.removeProductFromCart(userId, productId);
  }

  @Patch(':productId')
  updateProductCart(
    @Param('productId') productId: string,
    @Req() request: ExtendedRequest,
    @Body() updateProductCart: AddProductToCartDto,
  ) {
    const userId = request['userId'];
    return this.cartService.updateProductCart(
      userId,
      productId,
      updateProductCart.quantity,
    );
  }
}
