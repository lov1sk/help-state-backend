import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AuthModule } from './auth/auth.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dbOptions } from './config/typeorm-config';
import { UsersModule } from './users/users.module';
import { OccurrenceModule } from './occurrence/occurrence.module';

@Module({
  imports: [
    AuthModule,
    TypeOrmModule.forRoot(dbOptions),
    UsersModule,
    OccurrenceModule,
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}
