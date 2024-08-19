import { BadRequestException, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { hash } from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
  ) {}

  // Methods:
  // profile
  async getProfile(id: string) {
    let user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    delete user.password;
    return user;
  }
  // register user
  async register(createUserDto: CreateUserDto) {
    const userAlreadyExists = await this.usersRepository.findOne({
      where: {
        userName: createUserDto.userName,
      },
    });

    if (userAlreadyExists) throw new BadRequestException('User already exists');

    const hashedPassword = await hash(createUserDto.password, 6);
    createUserDto.password = hashedPassword;
    await this.usersRepository.save(createUserDto);
  }

  // remove user
  async remove(id: string) {
    const user = await this.usersRepository.findOne({
      where: {
        id,
      },
    });

    if (!user) throw new BadRequestException('User not found');

    return await this.usersRepository.remove(user);
  }
}
