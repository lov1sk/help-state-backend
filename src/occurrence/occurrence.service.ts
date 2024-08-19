import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Repository } from 'typeorm';
import { Occurrence } from './entities/occurrence.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateOccurrenceDto } from './dto/create-occurence.dto';
import { UserEnum } from '@/users/dto/user-enum';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class OccurrenceService {
  constructor(
    @InjectRepository(Occurrence)
    private readonly occurrenceRepository: Repository<Occurrence>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(userId: string, createOccurrenceDto: CreateOccurrenceDto) {
    const userExists = await this.userRepository.findOneBy({ id: userId });
    if (!userExists) throw new BadRequestException('User not exists');

    const hasPermission = userExists.type === UserEnum.CITIZEN;
    if (!hasPermission) throw new UnauthorizedException();

    return await this.occurrenceRepository.save({
      ...createOccurrenceDto,
      userId,
    });
  }

  // user list his occurrences
  async list() {}

  // admin list all occurrences
  async listWithPagination() {}

  // update in occurrence entity
  async resolveOccurrence() {}

  async deleteUnresolvedOccurrence() {}
}
