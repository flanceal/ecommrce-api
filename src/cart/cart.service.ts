import { Inject, Injectable } from '@nestjs/common';
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
      await this.cartRepository.updateProductCart(userId, productId, quantity);
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
  ): Promise<void> {
    await this.cartRepository.updateProductCart(userId, productId, quantity);
  }
}
