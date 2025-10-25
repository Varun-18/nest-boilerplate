import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { AddUserCommand } from './add-user.command';
import { InjectPinoLogger, PinoLogger } from 'nestjs-pino';

@CommandHandler(AddUserCommand)
export class AddUserCommandHandler
  implements ICommandHandler<AddUserCommand, unknown>
{
  constructor(
    @InjectPinoLogger(AddUserCommand.name)
    protected readonly logger: PinoLogger,
  ) {}
  public async execute(command: AddUserCommand): Promise<unknown> {
    this.logger.info(
      `Executing command ${AddUserCommand.name} for Email : ${command.email}`,
    );
    const abc = await new Promise((res) => {
      setTimeout(() => {
        res('success');
      }, 1000);
    });
    return abc;
  }
}
