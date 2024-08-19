import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UsersService } from './users.service';
import { CurrentUser } from '@/auth/decorators/current-user';
import { Roles } from '@/auth/decorators/user-role';
import { AuthGuard } from '@/auth/guards/auth.guard';
import { RolesGuard } from '@/auth/guards/user-role.guard';
import { CurrentUserRequest } from '@/auth/types/current-user-type';
import { UserEnum } from './dto/user-enum';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}
  // Methods:
  // profile
  @Post('/new')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.usersService.register(createUserDto);
  }
  // register user
  @UseGuards(AuthGuard)
  @Get('/profile')
  async profile(@CurrentUser() user: CurrentUserRequest) {
    return this.usersService.getProfile(user.sub);
  }

  // remove user
  @UseGuards(AuthGuard)
  @Delete('/remove')
  async remove(@CurrentUser() user: CurrentUserRequest) {
    return this.usersService.remove(user.sub);
  }

  // test role
  @Roles(...[UserEnum.GOVERMENT])
  @UseGuards(AuthGuard, RolesGuard)
  @Get('/gov')
  async testGovRole(@CurrentUser() user: CurrentUserRequest) {
    return { user, msg: 'ok' };
  }
}
