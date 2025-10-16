import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedBaseLibModule } from './libs';
import { UsersModule } from './users/users.module';

@Module({
  imports: [SharedBaseLibModule, UsersModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
