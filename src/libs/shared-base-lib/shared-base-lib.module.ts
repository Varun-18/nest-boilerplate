import { Module } from '@nestjs/common';
import { CqrsModule } from '@nestjs/cqrs';
import { CqrsMediator } from './cqrs/cqrs-mediator.service';

@Module({
  imports: [CqrsModule],
  providers: [CqrsMediator],
  exports: [CqrsMediator],
})
export class SharedBaseLibModule {}
