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
import { Project } from 'apps/projects/src/app/project/entities/project.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
      @InjectRepository(Project)
    private readonly projectRepository: Repository<Project>
  ) {}
  // create(createProductDto: CreateProductDto) {
  //   return 'This action adds a new product';
  // }

  // async create(request: CreateUserRequest): Promise<ProductResponse> {

  

  //   const project= await this.projectRepository.findOne({where:{id:request.projectId}})
    
  //   const product = await this.productRepository.create({...request,project:project});
  //   const svedProduct = await this.productRepository.save(product);
  //   // console.log(svedProduct.project);
  //   return {
  //     productId: svedProduct.id,
  //     name: svedProduct.name,
  //     price: svedProduct.price,
  //     project:svedProduct.project
  //   };
  // }

  async create(request: CreateUserRequest): Promise<ProductResponse> {
  const project = await this.projectRepository.findOne({
    where: { id: request.projectId },
  });

  const product = this.productRepository.create({
    name: request.name,
    price: request.price,
    project: project,
  });

  const savedProduct = await this.productRepository.save(product);

  return {
    productId: savedProduct.id,
    name: savedProduct.name,
    price: savedProduct.price,
    project: {
      id: savedProduct.project.id,
      name: savedProduct.project.name,
      description: savedProduct.project.description,
    },
  };
}


  findAll() {
    return `This action returns all products`;
  }

  async findOne(request: ProductRequest):Promise<ProductResponse> {
   
    const product = await this.productRepository.findOne({
      where: { id: request.productId },
      relations:['project']
    });
    console.log(product)
    return {
    productId: product.id,
    name: product.name,
    price: product.price,
    project: {
      id: product.project.id,
      name: product.project.name,
      description: product.project.description,
    },
  };
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`;
  }

  remove(id: number) {
    return `This action removes a #${id} product`;
  }
}
