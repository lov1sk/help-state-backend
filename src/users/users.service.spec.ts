import { Test, TestingModule } from '@nestjs/testing';
import { UsersService } from './users.service';
import { getRepositoryToken } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { MakeUser } from './factories/make-user';
import { CreateUserDto } from './dto/create-user.dto';
import { UserEnum } from './dto/user-enum';
import { BadRequestException } from '@nestjs/common';

describe('UsersService', () => {
  let service: UsersService;
  const mockUserRepository = {
    find: jest.fn(),
    findOne: jest.fn(),
    save: jest.fn(),
    remove: jest.fn(),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersService,
        {
          provide: getRepositoryToken(User),
          useValue: mockUserRepository,
        },
      ],
    }).compile();

    service = module.get<UsersService>(UsersService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should be able to register a new user', async () => {
    const user = MakeUser({ type: UserEnum.CITIZEN });

    mockUserRepository.findOne.mockResolvedValue(undefined);
    mockUserRepository.save.mockResolvedValue(user);

    const createUserDto: CreateUserDto = {
      name: user.name,
      userName: user.userName,
      password: user.password,
      type: user.type,
      uf: user.uf,
    };
    await service.register(createUserDto);

    expect(mockUserRepository.save).toHaveBeenCalled();
  });
  it('should not be able to register a duplicated user', async () => {
    const user = MakeUser({ type: UserEnum.CITIZEN });
    mockUserRepository.findOne.mockResolvedValue(user);

    const createUserDto: CreateUserDto = {
      name: user.name,
      userName: user.userName,
      password: user.password,
      type: user.type,
      uf: user.uf,
    };
    await expect(service.register(createUserDto)).rejects.toBeInstanceOf(
      BadRequestException,
    );
  });

  it('should be able to get a user profile', async () => {
    let user = MakeUser({ type: UserEnum.CITIZEN });
    mockUserRepository.findOne.mockResolvedValue(user);

    const sut = await service.getProfile(user.id);
    delete user.password;
    expect(sut).toEqual(user);
  });
  it('should be able to delete an existent user', async () => {
    const user = MakeUser({ type: UserEnum.CITIZEN });
    mockUserRepository.findOne.mockResolvedValue(user);

    await service.remove(user.id);
    expect(mockUserRepository.remove).toHaveBeenCalledWith(user);
  });
});
