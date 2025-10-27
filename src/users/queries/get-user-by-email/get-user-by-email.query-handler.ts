import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';
import { GetUserByEmailQuery } from './get-user-by-email.query';
import { User } from 'src/users/domain';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@QueryHandler(GetUserByEmailQuery)
export class GetUserByEmailQueryHandler
  implements IQueryHandler<GetUserByEmailQuery, User>
{
  constructor(
    @InjectPinoLogger(GetUserByEmailQuery.name)
    protected readonly logger: PinoLogger,
  ) {}

  public async execute(query: GetUserByEmailQuery): Promise<User> {
    this.logger.info(
      `Executing Query ${GetUserByEmailQuery.name} for user : ${query.email}`,
    );

    const abc = await new Promise<User>((res) => {
      setTimeout(() => {
        // res(new User(query.email));
      }, 1000);
    });
    return abc;
  }
}
