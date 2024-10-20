import { IsNumber, Max, Min } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';

export class AddProductToCartDto extends PartialType(CreateCartDto) {
  @IsNumber()
  @Min(1)
  @Max(100)
  quantity: number;
}
