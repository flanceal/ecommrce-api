import CreateProductDto from '../../../application/modules/product/dto/create-product.dto';
import UpdateProductDto from '../../../application/modules/product/dto/update-product.dto';
import IProduct from '../entity/product.entity';

export default interface ProductRepository {
  getProducts(
    min_price: number | null,
    max_price: number | null,
    category: string | null,
  ): Promise<IProduct[]>;

  getProduct(productId: string): Promise<IProduct>;

  createProduct(createProductDto: CreateProductDto): Promise<void>;

  updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<void>;

  deleteProduct(productId: string): Promise<void>;
}
