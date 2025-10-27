import { Filter, IPageable, PageableFilter } from '@shared-base-lib/filtering';

export interface IReadOnlyRepo<
  T,
  TKey,
  TPageableFilter = PageableFilter<T, TKey>,
  TFilter = Filter<T, TKey>,
> {
  getAsync(pk: TKey): Promise<T | null>;
  findOneAsync(filter?: TFilter): Promise<T | null>;
  allAsync(filter?: TFilter): Promise<T[]>;
  pagedAsync(filter?: TPageableFilter): Promise<IPageable<T>>;
  countAsync(filter?: TFilter): Promise<number>;
  existAsync(filter?: TFilter): Promise<boolean>;
}
