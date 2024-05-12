import { IOrderItemsRepository } from './iorder-items.repository';
import { PrismaOrderItemsRepository } from './prisma-order-items-repository';
import { ProviderMaker } from '../../application/utils/provider-maker';



export const OrderRepositoryProvider = ProviderMaker.make(IOrderItemsRepository, PrismaOrderItemsRepository);
