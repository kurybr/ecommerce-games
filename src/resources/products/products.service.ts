import { BadRequestException, Injectable } from '@nestjs/common';
import { Prisma, Product } from 'prisma/generated';
import { DefaultArgs } from 'prisma/generated/runtime/library';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(term?: string): Promise<Partial<Product>[]> {


    const query: Prisma.ProductFindManyArgs<DefaultArgs> = {
      select: {
        id: true,
        name: true,
        price: true,
        isHighlights: true,
      },
      orderBy: [{ isHighlights: 'desc' }, { createdAt: 'desc' }],
    }

    if(term) {
      query.where = {
        name: {  contains: term }
      }
    }

    const products = await this.prisma.product.findMany(query);

    return products;
  }

  async findOne(id: string): Promise<Product> {
    const product = await this.prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new BadRequestException('Product not found');
    }

    return product;
  }
}
