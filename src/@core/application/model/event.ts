export abstract class IEvent<TInput, TOutput> {
  abstract execute(args: TInput): Promise<TOutput>;
}
