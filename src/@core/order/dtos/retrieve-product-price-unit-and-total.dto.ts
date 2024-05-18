import { ProductEntity } from '../entitites/product.entity';

export class RetrieveProductPriceUnitAndTotalDto {
  totalPrice: number;
  products: ProductEntity[];
}
