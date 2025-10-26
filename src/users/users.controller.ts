import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, Inject, Param, Post } from '@nestjs/common';
import { CqrsMediator } from '@shared-base-lib';
import { User } from './domain';
import { AddUserRequest, GetUserByEmailRequest } from './models';
import { AddUserCommand } from './commands';
import { GetUserByEmailQuery } from './queries';
import { ApiOperation } from '@nestjs/swagger';

@Controller('users')
export class UsersController {
  constructor(
    @InjectMapper() protected readonly mapper: Mapper,
    @Inject() protected readonly mediator: CqrsMediator,
  ) {}

  // @ApiOperation({ description: 'Get User By Email Id' })
  // @Get(':email')
  // public async getUserByEmail(
  //   @Param() param: GetUserByEmailRequest,
  // ): Promise<User> {
  //   const query = this.mapper.map(
  //     param,
  //     GetUserByEmailRequest,
  //     GetUserByEmailQuery,
  //   );
  //   const user = await this.mediator.execute<GetUserByEmailQuery, User>(query);
  //   return user;
  // }

  @ApiOperation({ description: 'Add New User' })
  @Post()
  public async addUser(@Body() model: AddUserRequest): Promise<string> {
    const command = this.mapper.map(model, AddUserRequest, AddUserCommand);
    const res = await this.mediator.execute<AddUserCommand, string>(command);
    return res;
  }
}
