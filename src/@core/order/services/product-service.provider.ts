import { ProviderMaker } from '../../application/utils/provider-maker';
import { ProductService } from './product.service';
import { IProductService } from './product-service.interface';

export const ProductServiceProvider = ProviderMaker.make(
  IProductService,
  ProductService,
);
