import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, Inject, Post } from '@nestjs/common';
import { CqrsMediator } from '@shared-base-lib';
import { User } from './domain';
import { AddUserRequest } from './models';
import { AddUserCommand } from './commands';

@Controller('users')
export class UsersController {
  private users: User[];
  constructor(
    @InjectMapper() protected readonly mapper: Mapper,
    @Inject() protected readonly mediator: CqrsMediator,
  ) {
    this.users = [
      {
        email: 'varun@admin.com',
      },
    ];
  }

  @Get()
  public listUsers(): User[] {
    return this.users;
  }

  @Post()
  public async addUser(@Body() model: AddUserRequest): Promise<string> {
    const command = this.mapper.map(model, AddUserRequest, AddUserCommand);
    const res = await this.mediator.execute<AddUserCommand, string>(command);
    return res;
  }
}
