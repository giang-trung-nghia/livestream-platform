import { Body, Controller, HttpCode, HttpStatus, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignInDto } from './dto/signInDto.dto';
import { Public } from 'src/common/public_key';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { LivestreamService } from '../livestream/livestream.service';

@Controller('auth')
export class AuthController {
  constructor(
    private readonly _authService: AuthService,
    private readonly _liveService: LivestreamService,
  ) {}

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signin')
  async signIn(@Body() signInDto: SignInDto): Promise<any> {
    return await this._authService.signIn(signInDto.email, signInDto.password);
  }

  @Public()
  @HttpCode(HttpStatus.OK)
  @Post('signup')
  async signUp(@Body() createUserDto: CreateUserDto): Promise<void> {
    await this._authService.signUp(createUserDto);
  }

  @Public()
  @Post('')
  async authLivestream(@Body() body: any): Promise<any> {
    const result = await this._liveService.startLivestream(
      body.userId,
      body.liveId,
      body.name,
    );
    return result;
  }
}
