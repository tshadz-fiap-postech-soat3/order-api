import { ProviderMaker } from '../../../../@core/application/utils/provider-maker';
import { IProductService } from '../../../../@core/order/services/product-service.interface';
import { ProductService } from './product.service';

export const ProductServiceProvider = ProviderMaker.make(IProductService, ProductService);
