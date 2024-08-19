import { User } from '@/users/entities/user.entity';
import { ExecutionContext, createParamDecorator } from '@nestjs/common';

interface RequestWithUser extends Request {
  user: User;
}

export const CurrentUser = createParamDecorator(
  (data: unknown, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<RequestWithUser>();
    return request.user;
  },
);
