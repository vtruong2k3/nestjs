import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  ValidationPipe,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
// import { UpdateProductDto } from './dto/update-product.dto';

@Controller('product')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}
  @Get()
  findAll() {
    return this.productsService.findAll();
  }
  @Get('/:id')
  findOne(@Param('id') id: number) {
    return this.productsService.findOne(id);
  }
  @Post()
  create(@Body(new ValidationPipe()) createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }
  @Put('/:id')
  update(@Param('id') id: number, @Body() updateProductDto: UpdateProductDto) {
    return this.productsService.update(id, updateProductDto);
  }
  @Delete('/:id')
  delete(@Param('id') id: number) {
    return this.productsService.remove(id);
  }
}
