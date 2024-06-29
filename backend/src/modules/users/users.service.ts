import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './user.entity';
import { Repository } from 'typeorm';
import { UserDto } from './dto/user.dto';
import { plainToInstance } from 'class-transformer';
import { CreateUserDto } from './dto/create-user.dto';
import { ObjectId } from 'mongodb';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly _userRepository: Repository<UserEntity>,
  ) {}

  async getAll(): Promise<UserDto[]> {
    const result = await this._userRepository.find();

    return result;
  }

  async getByName(username: string): Promise<UserDto> {
    const result = await this._userRepository.findOne({
      where: {
        username: username,
      },
    });
    const dto = plainToInstance(UserDto, result, {
      excludeExtraneousValues: true,
    });

    return dto;
  }

  async findOneById(id: ObjectId): Promise<UserDto> {
    const objectId = new ObjectId(id);

    const result = await this._userRepository.findOneBy({
      _id: objectId,
    });
    if (!result) {
      throw new BadRequestException('Not found userId: ' + id);
    }
    const dto = plainToInstance(UserDto, result, {
      excludeExtraneousValues: true,
    });

    dto._id = objectId;

    return dto;
  }

  async findOneByProperty(value: any, property: any): Promise<UserEntity> {
    const result = await this._userRepository.findOne({
      where: {
        [property]: value,
      },
    });
    return result;
  }

  async insert(userDto: CreateUserDto): Promise<UserDto> {
    try {
      userDto.createdAt = new Date();
      userDto.updatedAt = new Date();
      const result: UserEntity = await this._userRepository.save(userDto);
      result.isActive = true;
      result.role = 'user';
      await this._userRepository.save(result);
      return plainToInstance(UserDto, result, {
        excludeExtraneousValues: true,
      });
    } catch (e) {
      throw new BadRequestException('Duplicate mail or username');
    }
  }

  async update(_id: ObjectId, userUpdateDto: UpdateUserDto): Promise<UserDto> {
    userUpdateDto = { ...userUpdateDto, updatedAt: new Date() };

    await this._userRepository.update(_id, userUpdateDto);
    const result = await this._userRepository.findOne({
      where: {
        _id: _id,
      },
    });

    return result;
  }

  async delete(id: string): Promise<{ success: string }> {
    await this._userRepository.delete(id);

    return {
      success: 'DELETE SUCCESS',
    };
  }
}
