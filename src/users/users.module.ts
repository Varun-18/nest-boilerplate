import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SharedBaseLibModule } from '@shared-base-lib';
import { LoggerModule } from 'nestjs-pino';
import CommandHandlers from './commands';
import Entities from './entities';
import { MappingProfiles } from './helpers';
import QueryHandlers from './queries';
import { UserRepository } from './repo';
import { UsersController } from './users.controller';

@Module({
  imports: [
    SharedBaseLibModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    LoggerModule.forRoot(),
    TypeOrmModule.forFeature([...Entities]),
  ],
  controllers: [UsersController],
  providers: [
    ...MappingProfiles,
    ...CommandHandlers,
    ...QueryHandlers,
    UserRepository,
  ],
  exports: [
    ...MappingProfiles,
    ...CommandHandlers,
    ...QueryHandlers,
    UserRepository,
  ],
})
export class UsersModule {}
