import { Provider, Type } from '@nestjs/common';
import { Abstract } from '@nestjs/common/interfaces/abstract.interface';

export type ProvideType = string | symbol | Type<any> | Abstract<any>;

export class ProviderMaker {
  private static isClass<T = any>(provider: Type<T> | T): provider is Type<T> {
    return (<Type<T>>provider).constructor !== undefined;
  }
  static make<T = any>(provide: ProvideType, provider: Type<T> | T): Provider {
    return ProviderMaker.isClass(provider) ? this.makeAClassProvider(provide, provider) : this.makeAValueProvider(provide, provider);
  }

  private static makeAValueProvider<T>(provide: string | symbol | Type<any> | Abstract<any>, provider: T) {
    return {
      provide,
      useValue: provider,
    };
  }

  private static makeAClassProvider<T>(provide: string | symbol | Type<any> | Abstract<any>, provider: Type<T>) {
    return {
      provide,
      useClass: provider,
    };
  }
}
