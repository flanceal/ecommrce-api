import {
  CanActivate,
  ExecutionContext,
  Inject,
  Injectable,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import CartRepository from '../../../domain/cart/repository/cart.repository';
import ProvidersConstants from '../../constraints/providers.constraints';

// THIS IS AUTH GUARD FILE YOU SHOULD CHANGE THE CODE OF CART AND AUTH GUARDS
@Injectable()
export class CartGuard implements CanActivate {
  constructor(
    private readonly configService: ConfigService,
    @Inject(ProvidersConstants.CART_REPOSITORY)
    private readonly cartRepository: CartRepository,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();

    const userId = request['userId'];

    const cart = await this.cartRepository.getCartById(userId);

    if (!cart) {
      await this.cartRepository.createCart(userId);
    }

    return true;
  }
}
