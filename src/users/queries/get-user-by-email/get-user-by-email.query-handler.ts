import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { User } from 'src/users/domain';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { IUserRepo, USER_REPO } from 'src/users/providers';
import { Inject } from '@nestjs/common';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery, User>
{
  constructor(
    @Inject(USER_REPO) protected readonly repo: IUserRepo,
    @InjectPinoLogger(GetUserByEmailQuery.name)
    protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetUserByEmailQuery): Promise<User> {
    this.logger.info(
      `Executing Query ${GetUserByEmailQuery.name} for user : ${query.email}`,
    );

    return await this.repo.getUserByEmail(query.email);
  }
}
