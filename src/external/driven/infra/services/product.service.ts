import { Injectable } from '@nestjs/common';
import { IProductService } from '../../../../@core/order/services/product-service.interface';
import { Result } from 'src/@core/application/result/result';
import { ProductEntity } from 'src/@core/order/entitites/product.entity';
import { ResultSuccess } from '../../../../@core/application/result/result-success';

@Injectable()
export class ProductService implements IProductService {
    async calculateTotalPrice(products: ProductEntity[]): Promise<Result<number>> {
        return new ResultSuccess(10)
    }

}
