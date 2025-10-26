import { Injectable } from '@nestjs/common';
import { Product } from 'prisma/generated';
import { PrismaService } from 'src/services/prisma.service';

@Injectable()
export class ProductsService {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Product[]> {
    const products = await this.prisma.product.findMany({
      orderBy: {
        createdAt: 'desc',
      },
    });

    return products;
  }

  findOne(id: string) {
    return `This action returns a #${id} product`;
  }
}
