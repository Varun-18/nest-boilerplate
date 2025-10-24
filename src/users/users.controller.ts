import { Mapper } from '@automapper/core';
import { InjectMapper } from '@automapper/nestjs';
import { Body, Controller, Get, Post } from '@nestjs/common';
import { User } from './domain';
import { AddUserRequest } from './models';

@Controller('users')
export class UsersController {
  private users: User[];
  constructor(@InjectMapper() protected readonly mapper: Mapper) {
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
  public addUser(@Body() model: AddUserRequest): User {
    const user = this.mapper.map(model, AddUserRequest, User);
    console.log('🚀 ~ UsersController ~ addUser ~ user:', user);
    return user;
  }
}
