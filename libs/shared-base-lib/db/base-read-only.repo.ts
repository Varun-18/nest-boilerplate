/* eslint-disable @typescript-eslint/no-unused-vars */
import { Mapper } from '@automapper/core';
import { DatabaseException } from '@shared-base-lib';
import {
  EOrder,
  Filter,
  IPageable,
  PageableFilter,
} from '@shared-base-lib/filtering';
import { PinoLogger } from 'nestjs-pino';
import {
  FindManyOptions,
  FindOptionsWhere,
  ObjectLiteral,
  Repository,
} from 'typeorm';
import { IReadOnlyRepo } from './i-read-only.repo';

export abstract class BaseReadOnlyRepo<
  TEntity extends ObjectLiteral,
  TModel,
  TKey = string,
> implements IReadOnlyRepo<TModel, TKey>
{
  protected readonly idColumnName: keyof TEntity = 'id' as keyof TEntity;

  constructor(
    protected readonly repo: Repository<TEntity>,
    protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
    protected readonly entityClass: new () => TEntity,
    protected readonly modelClass: new () => TModel,
  ) {}

  async getAsync(pk: TKey): Promise<TModel | null> {
    try {
      const entity = await this.repo.findOne({
        where: { [this.idColumnName]: pk } as FindOptionsWhere<TEntity>,
      });

      if (!entity) return null;

      return this.mapper.map(entity, this.entityClass, this.modelClass);
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }

  async findOneAsync(filter?: Filter<TModel, TKey>): Promise<TModel | null> {
    try {
      const options = this.buildFindOptions(filter);
      const entity = await this.repo.findOne(options);

      if (!entity) return null;

      return this.mapper.map(entity, this.entityClass, this.modelClass);
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }

  async allAsync(filter?: Filter<TModel, TKey>): Promise<TModel[]> {
    try {
      const options = this.buildFindOptions(filter);
      const entities = await this.repo.find(options);

      return this.mapper.mapArray(entities, this.entityClass, this.modelClass);
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }

  async pagedAsync(
    filter?: PageableFilter<TModel, TKey>,
  ): Promise<IPageable<TModel>> {
    try {
      const page = filter?.$page || 1;
      const perPage = filter?.$perPage || 10;
      const skip = (page - 1) * perPage;

      const options = this.buildFindOptions(filter);
      options.skip = skip;
      options.take = perPage;

      const [entities, totalCount] = await this.repo.findAndCount(options);

      return {
        items: this.mapper.mapArray(
          entities,
          this.entityClass,
          this.modelClass,
        ),
        page,
        perPage,
        totalPages: Math.ceil(totalCount / perPage),
        totalCount,
      };
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }

  async countAsync(filter?: Filter<TModel, TKey>): Promise<number> {
    try {
      const options = this.buildFindOptions(filter);
      return this.repo.count(options);
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }

  async existAsync(filter?: Filter<TModel, TKey>): Promise<boolean> {
    try {
      const count = await this.countAsync(filter);
      return count > 0;
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }

  protected buildFindOptions(
    filter?: Filter<TModel, TKey>,
  ): FindManyOptions<TEntity> {
    const options: FindManyOptions<TEntity> = {};

    if (!filter) {
      return options;
    }

    // Handle special filter properties
    const { $ids, $orderBy, $order, $page, $perPage, ...whereConditions } =
      filter as any;

    // Build where clause
    const where: any = { ...whereConditions };

    if ($ids && $ids.length > 0) {
      where[this.idColumnName] = $ids;
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

  protected mapToModel(entity: TEntity): TModel {
    return this.mapper.map(entity, this.entityClass, this.modelClass);
  }

  protected mapToModelArray(entities: TEntity[]): TModel[] {
    return this.mapper.mapArray(entities, this.entityClass, this.modelClass);
  }
}
