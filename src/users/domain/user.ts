import { AutoMap } from '@automapper/classes';

export class User {
  @AutoMap()
  public email: string;

  constructor(email: string) {
    this.email = email;
  }
}
