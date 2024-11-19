import { Controller, Get, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Product } from '../../schemas/product.schema';
import { ProductService } from '../service/product.service';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @UseGuards(AuthGuard('jwt'))
  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }
}
