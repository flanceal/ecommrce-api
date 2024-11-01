import { IsEnum, IsNumber, Max, Min } from '@nestjs/class-validator';
import { PartialType } from '@nestjs/mapped-types';
import { CreateCartDto } from './create-cart.dto';

export enum ACTIONS {
  Add = 'add',
  Reduce = 'reduce',
  Remove = 'remove',
}

export class UpdateProductToCartDto extends PartialType(CreateCartDto) {
  @IsNumber()
  @Min(1)
  @Max(100)
  quantity: number;

  @IsEnum(ACTIONS)
  action: string;
}
