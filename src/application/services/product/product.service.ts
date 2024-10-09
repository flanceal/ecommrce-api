import { Inject, Injectable } from '@nestjs/common';
import ProductRepository from '../../../domain/product/repository/product.repository';
import ProvidersConstants from '../../constraints/providers.constraints';
import CreateProductDto from '../../modules/product/dto/create-product.dto';
import UpdateProductDto from '../../modules/product/dto/update-product.dto';

@Injectable()
export class ProductService {
  constructor(
    @Inject(ProvidersConstants.PRODUCT_REPOSITORY)
    private readonly productRepository: ProductRepository,
  ) {}

  getProducts(min_price: number | null, max_price: number | null) {
    return this.productRepository.getProducts(min_price, max_price);
  }

  getProduct(productId: string) {
    return this.productRepository.getProduct(productId);
  }

  createProduct(createProductDto: CreateProductDto) {
    return this.productRepository.createProduct(createProductDto);
  }

  updateProduct(productId: string, updateProductDto: UpdateProductDto) {
    return this.productRepository.updateProduct(productId, updateProductDto);
  }

  deleteProduct(productId: string) {
    return this.productRepository.deleteProduct(productId);
  }
}
