import { Injectable } from '@nestjs/common';
import {
  IProductService,
  RetrievePriceOfProductsInTotalAndPerUnitRequestDto,
  RetrievePriceOfProductsInTotalAndPerUnitResponseDto,
} from './product-service.interface';
import { IProductExternal } from './product-external.interface';
import { ResultSuccess } from 'src/@core/application/result/result-success';

@Injectable()
export class ProductService implements IProductService {
  constructor(private productExternal: IProductExternal) {}

  public async retrievePriceOfProductsInTotalAndPerUnit(
    retrievePriceOfProductsInTotalAndPerUnitDto: RetrievePriceOfProductsInTotalAndPerUnitRequestDto,
  ): Promise<
    ResultSuccess<RetrievePriceOfProductsInTotalAndPerUnitResponseDto>
  > {
    const retrievedProducts =
      await this.productExternal.retrievePriceOfProductsInTotalAndPerUnit(
        retrievePriceOfProductsInTotalAndPerUnitDto,
      );

    return new ResultSuccess<RetrievePriceOfProductsInTotalAndPerUnitResponseDto>(
      {
        totalPrice: retrievedProducts.data.totalPrice,
        products: retrievedProducts.data.products,
      },
    );
  }
}
