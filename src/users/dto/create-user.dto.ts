import { IsEnum, IsNotEmpty, IsString, Length } from 'class-validator';
import { UserEnum } from './user-enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  userName: string;

  @IsString()
  @Length(2)
  @IsNotEmpty()
  password: string;

  @IsString()
  @IsNotEmpty()
  uf: string;

  @IsEnum(UserEnum)
  @IsNotEmpty()
  type: string;
}
