import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Inject } from '@nestjs/common';
import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { User } from '../../domain';
import { IUserRepo, USER_REPO } from '../../providers';
import { AddUserCommand } from './add-user.command';

@CommandHandler(AddUserCommand)
export class AddUserCommandHandler
  implements ICommandHandler<AddUserCommand, unknown>
{
  constructor(
    @Inject(USER_REPO)
    protected readonly repo: IUserRepo,
    @InjectMapper()
    protected readonly mapper: Mapper,
    @InjectPinoLogger(AddUserCommand.name)
    protected readonly logger: PinoLogger,
  ) {}
  public async execute(command: AddUserCommand): Promise<unknown> {
    this.logger.info(
      `Executing command ${AddUserCommand.name} for Email : ${command.email}`,
    );

    const user = this.mapper.map(command, AddUserCommand, User);
    const response = await this.repo.createAsync(user);

    return response;
  }
}
