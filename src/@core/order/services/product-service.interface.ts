
import { Result } from '../../application/result/result';
import { ProductEntity } from '../entitites/product.entity';
import { ResultSuccess } from '../../application/result/result-success';

export abstract class IProductService {
  public abstract calculateTotalPrice(
   products: ProductEntity[]
  ): Promise<ResultSuccess<number>>;
}
