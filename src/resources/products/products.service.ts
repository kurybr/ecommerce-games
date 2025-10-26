import { BadRequestException, Injectable } from '@nestjs/common';
import { Product } from 'prisma/generated';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Partial<Product>[]> {
    const products = await this.prisma.product.findMany({
      select: {
        id: true,
        name: true,
        price: true,
        isHighlights: true,
      },
      orderBy: [{ isHighlights: 'desc' }, { createdAt: 'desc' }],
    });

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
