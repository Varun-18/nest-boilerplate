import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseRepository } from '@shared-base-lib';
import { UserEntity } from '../entities';

export const USER_REPO = 'USER_REPO';

@Injectable()
export class UserRepository extends BaseRepository<UserEntity, string> {
  constructor(
    @InjectRepository(UserEntity)
    repo: Repository<UserEntity>,
  ) {
    super(repo);
  }

  protected getPrimaryKeyField(): keyof UserEntity {
    return 'id';
  }

  // Add custom methods here
  async findByEmail(email: string): Promise<UserEntity | null> {
    return this.repository.findOne({ where: { email } });
  }
}
