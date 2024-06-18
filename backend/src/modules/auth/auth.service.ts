import { BadRequestException, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/modules/users/users.service';
import { CreateUserDto } from '../users/dto/create-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private readonly _userService: UserService,
    private jwtService: JwtService,
  ) {}

  async signIn(email: string, pass: string): Promise<any> {
    const user = await this._userService.findOneByProperty(email, 'email');

    if (user?.password !== pass) {
      throw new BadRequestException('Email or password is invalid');
    }
    const payload = {
      sub: user._id,
    };
    return {
      token: await this.jwtService.signAsync(payload),
      userId: user._id,
      userInfo: user,
    };
  }

  async signUp(createUserDto: CreateUserDto): Promise<void> {
    const userByUsername = await this._userService.findOneByProperty(
      createUserDto.username,
      'username',
    );
    const userByEmail = await this._userService.findOneByProperty(
      createUserDto.email,
      'email',
    );
    createUserDto.name = createUserDto.username;
    if (userByUsername && userByEmail) {
      throw new BadRequestException(
        'Username or Email is existed. Please try again!',
      );
    }
    await this._userService.insert(createUserDto);
  }
}
