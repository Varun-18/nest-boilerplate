/* eslint-disable @typescript-eslint/no-unused-vars */
import { Repository, FindOptionsWhere, FindManyOptions } from 'typeorm';
import { IReadOnlyRepo } from './i-read-only.repo';
import {
  EOrder,
  Filter,
  IPageable,
  PageableFilter,
} from '@shared-base-lib/filtering';

export abstract class BaseReadOnlyRepository<
  T extends { id: TKey },
  TKey = string,
> implements IReadOnlyRepo<T, TKey>
{
  constructor(protected readonly repository: Repository<T>) {}

  protected abstract getPrimaryKeyField(): keyof T;

  async getAsync(pk: TKey): Promise<T | null> {
    const pkField = this.getPrimaryKeyField();
    return this.repository.findOne({
      where: { [pkField]: pk } as FindOptionsWhere<T>,
    });
  }

  async findOneAsync(filter?: Filter<T, TKey>): Promise<T | null> {
    const options = this.buildFindOptions(filter);
    return this.repository.findOne(options);
  }

  async allAsync(filter?: Filter<T, TKey>): Promise<T[]> {
    const options = this.buildFindOptions(filter);
    return this.repository.find(options);
  }

  async pagedAsync(filter?: PageableFilter<T, TKey>): Promise<IPageable<T>> {
    const page = filter?.$page || 1;
    const perPage = filter?.$perPage || 10;
    const skip = (page - 1) * perPage;

    const options = this.buildFindOptions(filter);
    options.skip = skip;
    options.take = perPage;

    const [items, totalCount] = await this.repository.findAndCount(options);

    return {
      items,
      page,
      perPage,
      totalPages: Math.ceil(totalCount / perPage),
      totalCount,
    };
  }

  async countAsync(filter?: Filter<T, TKey>): Promise<number> {
    const options = this.buildFindOptions(filter);
    return this.repository.count(options);
  }

  async existAsync(filter?: Filter<T, TKey>): Promise<boolean> {
    const count = await this.countAsync(filter);
    return count > 0;
  }

  protected buildFindOptions(filter?: Filter<T, TKey>): FindManyOptions<T> {
    const options: FindManyOptions<T> = {};

    if (!filter) {
      return options;
    }

    // Handle special filter properties
    const { $ids, $orderBy, $order, $page, $perPage, ...whereConditions } =
      filter as any;

    // Build where clause
    const where: any = { ...whereConditions };

    if ($ids && $ids.length > 0) {
      const pkField = this.getPrimaryKeyField();
      where[pkField] = $ids;
    }

    if (Object.keys(where).length > 0) {
      options.where = where;
    }

    // Build order clause
    if ($orderBy) {
      options.order = {
        [$orderBy]: $order || EOrder.ASC,
      } as any;
    }

    return options;
  }
}
