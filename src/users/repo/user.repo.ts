import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BaseRepo, DatabaseException } from '@shared-base-lib';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { Repository } from 'typeorm';
import { User } from '../domain';
import { UserEntity } from '../entities';
import { IUserRepo } from '../providers';
import { isNilOrEmpty } from '@shared-utils-lib';

@Injectable()
export class UserRepository
  extends BaseRepo<UserEntity, User, string>
  implements IUserRepo
{
  constructor(
    @InjectRepository(UserEntity)
    protected readonly repo: Repository<UserEntity>,
    @InjectMapper()
    protected readonly mapper: Mapper,
    @InjectPinoLogger(UserRepository.name)
    protected readonly logger: PinoLogger,
  ) {
    super(repo, mapper, logger, UserEntity, User);
  }

  public async getUserByEmail(email: string): Promise<User> {
    try {
      const user = await this.repo.findOneBy({ email });

      if (isNilOrEmpty(user)) {
        throw new DatabaseException(`User with email : ${email} not found`);
      }

      return this.mapper.map(user, UserEntity, User);
    } catch (ex) {
      this.logger.error(ex);
      throw new DatabaseException(ex);
    }
  }
}
