import { Repository } from 'typeorm';
import { BaseReadOnlyRepository } from './base-read-only.repo';
import { IBaseRepo } from './i-base.repo';

export abstract class BaseRepository<T extends { id: TKey }, TKey = string>
  extends BaseReadOnlyRepository<T, TKey>
  implements IBaseRepo<T, TKey>
{
  constructor(protected readonly repository: Repository<T>) {
    super(repository);
  }

  async createAsync(entry: T): Promise<T> {
    const created = this.repository.create(entry);
    return this.repository.save(created);
  }

  async updateAsync(entry: T): Promise<T> {
    return this.repository.save(entry);
  }

  async deleteAsync(pk: TKey, force: boolean = false): Promise<boolean> {
    const pkField = this.getPrimaryKeyField();

    if (force) {
      const result = await this.repository.delete({ [pkField]: pk } as any);
      return (result.affected ?? 0) > 0;
    }

    // Soft delete if entity has deletedAt field
    const entity = await this.getAsync(pk);
    if (!entity) {
      return false;
    }

    if ('deletedAt' in entity) {
      await this.repository.softDelete({ [pkField]: pk } as any);
      return true;
    }

    const result = await this.repository.delete({ [pkField]: pk } as any);
    return (result.affected ?? 0) > 0;
  }
}
