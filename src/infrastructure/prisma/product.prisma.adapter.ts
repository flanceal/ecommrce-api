import { v4 as uuidv4 } from 'uuid';
import CreateProductDto from '../../application/modules/product/dto/create-product.dto';
import UpdateProductDto from '../../application/modules/product/dto/update-product.dto';
import { PrismaService } from '../../application/services/prisma/prisma.service';
import IProduct from '../../domain/product/entity/product.entity';
import ProductRepository from '../../domain/product/repository/product.repository';
import ProductFromDBMapper from '../mapper/prisma.mapper';

export default class ProductAdapter implements ProductRepository {
  constructor(
    private prisma: PrismaService,
    private mapper: ProductFromDBMapper,
  ) {}

  async getProducts(
    min_price: number | null,
    max_price: number | null,
  ): Promise<IProduct[]> {
    const products = await this.prisma.product.findMany({
      where: {
        price: {
          ...(max_price !== null && { lt: max_price }),
          ...(min_price !== null && { gt: min_price }),
        },
      },
    });

    return this.mapper.toProductEntityBulk(products);
  }
  async getProduct(productId: string): Promise<IProduct> {
    const product = await this.prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    return this.mapper.toProductEntity(product);
  }
  async createProduct(createProductDto: CreateProductDto): Promise<void> {
    await this.prisma.product.create({
      data: {
        ...createProductDto,
        id: uuidv4(),
      },
    });
  }
  async updateProduct(
    productId: string,
    updateProductDto: UpdateProductDto,
  ): Promise<void> {
    await this.prisma.product.update({
      where: {
        id: productId,
      },
      data: updateProductDto,
    });
  }

  async deleteProduct(productId: string): Promise<void> {
    await this.prisma.product.delete({
      where: {
        id: productId,
      },
    });
  }
}
