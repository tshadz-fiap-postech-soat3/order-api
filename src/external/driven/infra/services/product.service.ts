import { Injectable } from '@nestjs/common';
import {
  IProductService,
  RetrievePriceOfProductsInTotalAndPerUnitRequestDto,
  RetrievePriceOfProductsInTotalAndPerUnitResponseDto,
} from '../../../../@core/order/services/product-service.interface';
import { ResultSuccess } from '../../../../@core/application/result/result-success';
import { ProductEntity } from '../../../../@core/order/entitites/product.entity';

function sleep(ms: number): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

@Injectable()
export class ProductService implements IProductService {
  public async retrievePriceOfProductsInTotalAndPerUnit(
    requestDto: RetrievePriceOfProductsInTotalAndPerUnitRequestDto,
  ): Promise<
    ResultSuccess<RetrievePriceOfProductsInTotalAndPerUnitResponseDto>
  > {
    const { products } = requestDto;
    await sleep(30000);
    const response = this.simulateProductServiceResponse(products);
    return new ResultSuccess<RetrievePriceOfProductsInTotalAndPerUnitResponseDto>(
      response,
    );
  }

  private simulateProductServiceResponse(
    products: { id: string }[],
  ): RetrievePriceOfProductsInTotalAndPerUnitResponseDto {
    return {
      totalPrice: 200,
      products: products.map((item) =>
        new ProductEntity('Item 1', 200, 1).setId(item.id),
      ),
    };
  }
}
