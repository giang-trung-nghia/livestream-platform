import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserDto } from './dto/user.dto';
import { UserService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongodb';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('user')
export class UserController {
  constructor(private readonly _userService: UserService) {}

  @Get()
  async getAll(): Promise<UserDto[]> {
    const result = await this._userService.getAll();

    return result;
  }

  @Get('username/:username')
  async getByName(@Param('username') username: string): Promise<UserDto> {
    const result = await this._userService.getByName(username);
    return result;
  }

  @Get('/:id')
  async findOneById(@Param('id') id: ObjectId): Promise<UserDto> {
    const result = await this._userService.findOneById(id);
    return result;
  }

  @Post()
  async createUser(@Body() user: CreateUserDto): Promise<UserDto> {
    const existedUser = await this._userService.getByName(user.username);

    if (existedUser != null) {
      throw new BadRequestException('Duplicate username');
    }

    const result = this._userService.insert(user);

    return result;
  }

  @Put('/:id')
  async updateUserById(
    @Param('id') id: string,
    @Body() user: UpdateUserDto,
  ): Promise<UserDto> {
    const objectId = new ObjectId(id);
    return this._userService.update(objectId, user);
  }
}
