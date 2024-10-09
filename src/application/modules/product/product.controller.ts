import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
  UseGuards,
} from '@nestjs/common';
import IProduct from '../../../domain/product/entity/product.entity';
import { AuthGuard } from '../../guards/auth/auth.guard';
import { OptionalParseFloatPipe } from '../../pipes/optionalParseFloat.pipe';
import { ProductService } from '../../services/product/product.service';
import CreateProductDto from './dto/create-product.dto';
import UpdateProductDto from './dto/update-product.dto';

@Controller('/api/v1/products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Get()
  async getProduct(
    @Query('min_price', OptionalParseFloatPipe) min_price: number | null,
    @Query('max_price', OptionalParseFloatPipe) max_price: number | null,
    @Query('category') category: string | null,
  ): Promise<IProduct[]> {
    return await this.productService.getProducts(
      min_price,
      max_price,
      category,
    );
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async getAProduct(@Param('id') id: string): Promise<IProduct> {
    return this.productService.getProduct(id);
  }

  @Post()
  async createProduct(
    @Body()
    body: CreateProductDto,
  ) {
    await this.productService.createProduct(body);
  }

  @Patch(':id')
  async updateProduct(
    @Body()
    body: UpdateProductDto,
    @Param('id')
    id: string,
  ) {
    await this.productService.updateProduct(id, body);
  }

  @Delete(':id')
  async deleteProduct(
    @Param('id')
    id: string,
  ) {
    await this.productService.deleteProduct(id);
  }
}
