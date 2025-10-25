import { AutoMap } from '@automapper/classes';
import { CommandBase } from '@shared-base-lib';

export class AddUserCommand extends CommandBase {
  @AutoMap()
  public email: string;
}
