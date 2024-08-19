import { Module } from '@nestjs/common';
import { OccurrenceService } from './occurrence.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Occurrence } from './entities/occurrence.entity';
import { User } from '@/users/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Occurrence, User])],
  providers: [OccurrenceService],
})
export class OccurrenceModule {}
