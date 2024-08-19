import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SignInDto } from './dto/sign-in.dto';
import { JwtService } from '@nestjs/jwt';
import { compare } from 'bcrypt';
import { User } from '@/users/entities/user.entity';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async signIn(signInDto: SignInDto): Promise<any> {
    const user = await this.usersRepository.findOneBy({
      userName: signInDto.userName,
    });
    if (!user) throw new UnauthorizedException();

    const isPasswordMatch = await compare(signInDto.pass, user.password);
    if (!isPasswordMatch) throw new UnauthorizedException();

    const accessToken = this.jwtService.sign({
      sub: user.id,
      type: user.type,
    });

    return { access_token: accessToken };
  }
}
