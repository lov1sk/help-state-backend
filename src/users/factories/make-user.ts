import { randomUUID } from 'crypto';
import { User } from '../entities/user.entity';
import { faker } from '@faker-js/faker';

type MakeUserRequest = Partial<User>;
type MakeUserResponse = User;

export function MakeUser(data: MakeUserRequest): MakeUserResponse {
  const id = data.id ?? randomUUID();

  return {
    id,
    name: data.name ?? faker.person.fullName(),
    password: data.password ?? faker.internet.password(),
    type: data.type ?? 'CITIZEN',
    uf: data.uf ?? faker.location.state(),
    userName: data.userName ?? faker.internet.userName(),
    isActive: data.isActive ?? true,
    occurrences: [],
  };
}
