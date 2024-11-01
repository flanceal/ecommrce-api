import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import ProvidersConstants from '../application/constraints/providers.constraints';
import CartRepository from '../domain/cart/repository/cart.repository';

@Injectable()
export class CartService {
  constructor(
    @Inject(ProvidersConstants.CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async createCart(userId: string): Promise<any> {
    await this.cartRepository.createCart(userId);
  }

  async getCartProducts(userId: string): Promise<any> {
    return await this.cartRepository.getCartProducts(userId);
  }

  async addProductToCart(
    userId: string,
    quantity: number,
    productId: string,
  ): Promise<any> {
    const product = await this.cartRepository.getProductFromCart(
      userId,
      productId,
    );

    if (product) {
      await this.cartRepository.updateProductCart(
        userId,
        productId,
        quantity + product.quantity,
      );
    } else {
      await this.cartRepository.addProductToCart(userId, productId, quantity);
    }
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<void> {
    await this.cartRepository.removeProductFromCart(userId, productId);
  }

  async updateProductCart(
    userId: string,
    productId: string,
    quantity: number,
    action: string,
  ): Promise<void> {
    const product = await this.cartRepository.getProductFromCart(
      userId,
      productId,
    );

    switch (action) {
      case 'reduce':
        if (this.isProductInTheCart(userId, productId)) {
          await this.cartRepository.updateProductCart(
            userId,
            productId,
            product.quantity - quantity,
          );
          break;
        } else {
          throw new NotFoundException('Product is not in the cart');
        }
      case 'remove':
        if (this.isProductInTheCart(userId, productId)) {
          await this.cartRepository.removeProductFromCart(userId, productId);
        } else {
          throw new NotFoundException('Product is not in the cart');
        }
    }
  }

  async isProductInTheCart(
    userId: string,
    productId: string,
  ): Promise<boolean> {
    const product = await this.cartRepository.getProductFromCart(
      userId,
      productId,
    );

    return !!product;
  }
}
