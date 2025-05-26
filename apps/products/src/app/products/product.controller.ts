import { Controller } from '@nestjs/common';
import { Observable } from 'rxjs';
import {
  CreateUserRequest,
  ProductRequest,
  ProductResponse,
  ProductServiceController,
  ProductServiceControllerMethods,
} from 'types/proto/products';
import { ProductsService } from './products.service';

@Controller('product')
@ProductServiceControllerMethods()
export class ProductController implements ProductServiceController {
  constructor(private readonly productsService: ProductsService) {}
  async getProduct(request: ProductRequest): Promise<ProductResponse> {
    const product = await this.productsService.findOne(request);
    // console.log(product);
    return {
      productId: product.id,
      name: product.name,
      price: product.price,
    };
  }
  create(
    request: CreateUserRequest
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    return this.productsService.create(request);
  }
}
