import { ProviderMaker } from '../../../../@core/application/utils/provider-maker';
import { ProductExternal } from './product.external';
import { IProductExternal } from '../../../../@core/order/services/product-external.interface';

export const ProductExternalProvider = ProviderMaker.make(
  IProductExternal,
  ProductExternal,
);
