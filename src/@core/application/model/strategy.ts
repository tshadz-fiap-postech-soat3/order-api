export abstract class IStrategy<TInput, TOutput> {
  abstract execute(args: TInput, session?: any): Promise<TOutput>;
}
