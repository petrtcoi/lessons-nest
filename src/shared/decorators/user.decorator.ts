import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { UserDto } from '../../entities/user/dto/user.dto';

export const UserDec = createParamDecorator(
  (data: unknown, ctx: ExecutionContext): UserDto => {
    const request = ctx.switchToHttp().getRequest();
    return request.user;
  },
);
