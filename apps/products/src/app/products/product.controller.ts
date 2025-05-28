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
  async getProduct(request: ProductRequest): Promise<ProductResponse> { //
    return await this.productsService.findOne(request);
    // console.log(product);
    
    
  }
  create(
    request: CreateUserRequest
  ): Promise<ProductResponse> | Observable<ProductResponse> | ProductResponse {
    //console.log(request);
    return this.productsService.create(request);
  }
}
