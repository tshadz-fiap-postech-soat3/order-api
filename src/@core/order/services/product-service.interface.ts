import { ProductEntity } from '../entitites/product.entity';
import { ResultSuccess } from '../../application/result/result-success';

export class RetrievePriceOfProductsInTotalAndPerUnitRequestDto {
  products: ProductPriceDto[];
}

export class ProductPriceDto {
  id: string;
  quantity: number;
}
export class RetrievePriceOfProductsInTotalAndPerUnitResponseDto {
  totalPrice: number;
  products: ProductEntity[];
}
export abstract class IProductService {
  public abstract retrievePriceOfProductsInTotalAndPerUnit(
    retrievePriceOfProductsInTotalAndPerUnitDto: RetrievePriceOfProductsInTotalAndPerUnitRequestDto,
  ): Promise<
    ResultSuccess<RetrievePriceOfProductsInTotalAndPerUnitResponseDto>
  >;
}
