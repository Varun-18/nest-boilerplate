import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { AddUserCommand } from '../commands';
import { AddUserRequest, GetUserByEmailRequest } from '../models';
import { GetUserByEmailQuery } from '../queries';

@Injectable()
export class UserMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  public override get profile(): MappingProfile {
    return (mapper) => {
      this.add(mapper);
      this.get(mapper);
    };
  }

  private get(mapper: Mapper): void {
    createMap(mapper, GetUserByEmailRequest, GetUserByEmailQuery);
  }

  private add(mapper: Mapper): void {
    createMap(mapper, AddUserRequest, AddUserCommand);
  }
}
