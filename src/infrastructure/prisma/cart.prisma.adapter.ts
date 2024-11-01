import { NotFoundException } from '@nestjs/common';
import { NotFoundError } from 'rxjs';
import { PrismaService } from '../../application/services/prisma/prisma.service';
import CartRepository from '../../domain/cart/repository/cart.repository';

export interface CartEntity {
  id: string;
  userId: string;
}

export default class CartAdapter implements CartRepository {
  constructor(private prisma: PrismaService) {}
  async createCart(userId: string): Promise<void> {
    await this.prisma.cart.create({
      data: {
        userId,
      },
    });
  }

  async getCartById(userId: string): Promise<CartEntity> {
    return await this.prisma.cart.findUnique({
      where: {
        userId,
      },
    });
  }

  async getCartProducts(userId: string): Promise<any> {
    return await this.prisma.cart.findUnique({
      where: {
        userId,
      },
      include: {
        items: {
          include: {
            product: {
              select: {
                title: true,
                price: true,
                imageUrl: true,
              },
            },
          },
        },
      },
    });
  }

  async addProductToCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<any> {
    const cart = await this.getCartById(userId);

    await this.prisma.cartProduct.create({
      data: {
        quantity,
        productId,
        cartId: cart.id,
      },
    });
  }

  async removeProductFromCart(
    userId: string,
    productId: string,
  ): Promise<void> {
    const cart = await this.getCartById(userId);

    await this.prisma.cartProduct.delete({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });
  }

  async updateProductCart(
    userId: string,
    productId: string,
    quantity: number,
  ): Promise<void> {
    const cart = await this.getCartById(userId);

    const cartProduct = await this.prisma.cartProduct.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    if (cartProduct) {
      await this.prisma.cartProduct.update({
        data: { quantity },
        where: {
          cartId_productId: {
            cartId: cart.id,
            productId: productId,
          },
        },
      });
    } else {
      throw new NotFoundException('Product does not exist in the cart');
    }
  }

  async getProductFromCart(userId: string, productId: string): Promise<any> {
    const cart = await this.getCartById(userId);

    const product = await this.prisma.cartProduct.findUnique({
      where: {
        cartId_productId: {
          cartId: cart.id,
          productId: productId,
        },
      },
    });

    return product;
  }
}
