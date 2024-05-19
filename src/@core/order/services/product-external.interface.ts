import { ProductEntity } from '../entitites/product.entity';
import { ResultSuccess } from '../../application/result/result-success';

export class RetrievePriceOfProductsInTotalAndPerUnitExternalRequestDto {
  products: ProductPriceExternalDto[];
}

export class ProductPriceExternalDto {
  id: string;
  quantity: number;
}
export class RetrievePriceOfProductsInTotalAndPerUnitResponseDto {
  totalPrice: number;
  products: ProductEntity[];
}
export abstract class IProductExternal {
  public abstract retrievePriceOfProductsInTotalAndPerUnit(
    retrievePriceOfProductsInTotalAndPerUnitDto: RetrievePriceOfProductsInTotalAndPerUnitExternalRequestDto,
  ): Promise<
    ResultSuccess<RetrievePriceOfProductsInTotalAndPerUnitResponseDto>
  >;
}
