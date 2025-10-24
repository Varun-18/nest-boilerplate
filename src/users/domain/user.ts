import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
  public email: string;
}
