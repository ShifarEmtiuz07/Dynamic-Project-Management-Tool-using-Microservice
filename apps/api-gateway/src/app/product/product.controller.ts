import {
  CreateUserRequest,
  ProductRequest,
} from './../../../../../types/proto/products';
import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Inject,
  OnModuleInit,
  Param,
  Post,
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import {
  PRODUCT_SERVICE_NAME,
  PRODUCTS_PACKAGE_NAME,
  ProductServiceClient,
} from 'types/proto/products';

@Controller('product')
export class ProductController implements OnModuleInit {
  private productService: ProductServiceClient;

  constructor(@Inject(PRODUCTS_PACKAGE_NAME) private client: ClientGrpc) {}

  onModuleInit() {
    this.productService =
      this.client.getService<ProductServiceClient>(PRODUCT_SERVICE_NAME);
  }

  @Post()
  create(@Body() createUserRequest: CreateUserRequest) {
   // console.log(createUserRequest)
    return this.productService.create(createUserRequest);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.getProduct({ productId: id });
  }
}
