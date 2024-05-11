import { IOrderItemsRepository } from '../../repositories/iorder-items.repository';
import { PrismaOrderItemsRepository } from '../../repositories/prisma-order-items-repository';
import { ProviderMaker } from '../../../application/utils/provider-maker';



export const OrderRepositoryProvider = ProviderMaker.make(IOrderItemsRepository, PrismaOrderItemsRepository);
