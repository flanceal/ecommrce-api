import { Decimal } from '@prisma/client/runtime/library';
import IProduct from '../../domain/product/entity/product.entity';

interface ProductFromDB {
  id: string;
  title: string;
  price: Decimal;
  description: string;
  imageUrl: string;
}

export default class ProductFromDBMapper {
  toProductEntity(productFromDB: ProductFromDB): IProduct {
    return { ...productFromDB, price: Number(productFromDB.price) };
  }

  toProductEntityBulk(productsArrayFromDB: ProductFromDB[]): IProduct[] {
    return productsArrayFromDB.map((product) => this.toProductEntity(product));
  }
}
