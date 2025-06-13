import { Product } from '../../entities/product.entity';
import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';

import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private productRepository: Repository<Product>,
  ) {}
  async create(
    createProductDto: CreateProductDto,
  ): Promise<{ message: string; data: Product }> {
    const product = this.productRepository.create(createProductDto);
    const savedProduct = await this.productRepository.save(product);
    return {
      message: 'Product created successfully',
      data: savedProduct,
    };
  }

  findAll() {
    return this.productRepository.find();
  }

  findOne(id: number) {
    return this.productRepository.findOneBy({ id });
  }
  async update(id: number, updateProductDto: UpdateProductDto) {
    await this.productRepository.update(id, updateProductDto);
    const result = await this.productRepository.findOneBy({ id });
    return {
      message: 'Sửa thành công',
      data: result,
    };
  }
  async remove(id: number) {
    await this.productRepository.delete(id);
    return {
      message: 'Xoá thành công',
    };
  }
}
