import { IStrategy } from '../../../application/model/strategy';

export class MakeOrderPayment implements IStrategy<void, void> {
    execute(args: void, session?: any): Promise<void> {
        throw new Error('Method not implemented.');
    }
}
