import { Controller, Get, Param } from '@nestjs/common';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private readonly product: ProductsService) {}

  @Get()
  findAll() {
    return this.product.  findAll();
  }

  @Get(':productId')
  findOne(@Param('productId') id: string) {
    return this.product.findOne(id);
  }
}
