import IProduct from '../entity/product.entity';

export default interface ProductRepository {
  getProducts(): Promise<IProduct[]>;

  getProduct(): Promise<IProduct>;
}
