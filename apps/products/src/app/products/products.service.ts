import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import {
  CreateUserRequest,
  ProductRequest,
  ProductResponse,
} from 'types/proto/products';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>
  ) {}
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  async create(request: CreateUserRequest): Promise<ProductResponse> {
    const product = await this.productRepository.create(request);
    const svedProduct = await this.productRepository.save(product);
    return {
      productId: svedProduct.id,
      name: svedProduct.name,
      price: svedProduct.price,
    };
  }

  findAll() {
    return `This action returns all products`;
  }

  async findOne(request: ProductRequest) {
   
    const product = await this.productRepository.findOne({
      where: { id: request.productId },
    });
    return product;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
