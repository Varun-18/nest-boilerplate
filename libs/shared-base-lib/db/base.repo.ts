import { Mapper } from '@automapper/core';
import { DatabaseException } from '@shared-base-lib';
import { PinoLogger } from 'nestjs-pino';
import { ObjectLiteral, Repository } from 'typeorm';
import { BaseReadOnlyRepo } from './base-read-only.repo';
import { IBaseRepo } from './i-base.repo';

export interface IRepositoryOptions {
  autoUpdatedAt?: boolean;
  softDelete?: boolean;
}

export abstract class BaseRepo<
    TEntity extends ObjectLiteral,
    TModel,
    TKey = string,
  >
  extends BaseReadOnlyRepo<TEntity, TModel, TKey>
  implements IBaseRepo<TModel, TKey>
{
  protected autoUpdatedAtEnabled: boolean = true;
  protected softDeleteEnabled: boolean = true;

  constructor(
    protected readonly repo: Repository<TEntity>,
    protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
    protected readonly entityClass: new () => TEntity,
    protected readonly modelClass: new () => TModel,
    options?: IRepositoryOptions,
  ) {
    super(repo, mapper, logger, entityClass, modelClass);

    if (options?.autoUpdatedAt !== undefined) {
      this.autoUpdatedAtEnabled = options.autoUpdatedAt;
    }
    if (options?.softDelete !== undefined) {
      this.softDeleteEnabled = options.softDelete;
    }
  }

  async createAsync(entry: TModel): Promise<TModel> {
    try {
      const entity = this.mapper.map(entry, this.modelClass, this.entityClass);
      const saved = await this.repo.save(entity);
      return this.mapper.map(saved, this.entityClass, this.modelClass);
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }

  async updateAsync(entry: TModel): Promise<TModel> {
    try {
      const entity = this.mapper.map(entry, this.modelClass, this.entityClass);

      // Auto-update updatedAt field if enabled
      if (this.autoUpdatedAtEnabled && 'updatedAt' in entity) {
        (entity as any).updatedAt = new Date();
      }

      const saved = await this.repo.save(entity);
      return this.mapper.map(saved, this.entityClass, this.modelClass);
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }

  async deleteAsync(pk: TKey, force: boolean = false): Promise<boolean> {
    try {
      const key =
        typeof pk === 'object' ? { ...pk } : { [this.idColumnName]: pk };

      if (this.softDeleteEnabled && !force) {
        await this.repo.softDelete(key as any);
      } else {
        await this.repo.delete(key as any);
      }

      return true;
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }
}
