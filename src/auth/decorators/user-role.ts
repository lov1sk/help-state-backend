import { UserEnum } from '@/users/dto/user-enum';
import { SetMetadata, CustomDecorator } from '@nestjs/common';

export const Roles = (...roles: UserEnum[]): CustomDecorator<string> => {
  return SetMetadata('roles', roles);
};
