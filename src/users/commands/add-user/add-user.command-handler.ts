import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';
import { USER_REPO, UserRepository } from '../../repo';
import { AddUserCommand } from './add-user.command';
import { InjectMapper } from '@automapper/nestjs';
import { Mapper } from '@automapper/core';
import { User } from 'src/users/domain';
import { UserEntity } from 'src/users/entities';
import { Inject } from '@nestjs/common';

@CommandHandler(AddUserCommand)
export class AddUserCommandHandler
  implements ICommandHandler<AddUserCommand, unknown>
{
  constructor(
    @InjectPinoLogger(AddUserCommand.name)
    @Inject(USER_REPO)
    protected readonly repo: UserRepository,
    @InjectMapper() protected readonly mapper: Mapper,
    protected readonly logger: PinoLogger,
  ) {}
  public async execute(command: AddUserCommand): Promise<unknown> {
    this.logger.info(
      `Executing command ${AddUserCommand.name} for Email : ${command.email}`,
    );

    const user = this.mapper.map(command, AddUserCommand, User);
    console.log('🚀 ~ AddUserCommandHandler ~ execute ~ user:', user);
    const userEntity = this.mapper.map(user, User, UserEntity);
    console.log(
      '🚀 ~ AddUserCommandHandler ~ execute ~ userEntity:',
      userEntity,
    );
    const response = await this.repo.createAsync(userEntity);

    return response;
  }
}
