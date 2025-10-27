import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Injectable } from '@nestjs/common';
import { User } from '../domain';
import { UserEntity } from '../entities';

@Injectable()
export class ProfileMapper extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }
  public override get profile(): MappingProfile {
    return (mapper) => {
      this.add(mapper);
    };
  }

  private add(mapper: Mapper): void {
    createMap(mapper, User, UserEntity);
  }
}
