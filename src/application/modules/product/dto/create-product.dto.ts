import {
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPositive,
  IsString,
  Length,
  Max,
  Min,
} from '@nestjs/class-validator';

export default class CreateProductDto {
  @IsNotEmpty()
  @IsString()
  @Length(2, 78)
  title: string;

  @IsNotEmpty()
  @IsNumber({ allowNaN: false, allowInfinity: false, maxDecimalPlaces: 2 })
  @Min(1)
  @Max(100000)
  @IsPositive()
  price: number;

  @IsNotEmpty()
  @IsString()
  @Length(2, 78)
  category: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;
}
