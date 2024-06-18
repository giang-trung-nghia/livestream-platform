import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/base/base.dto';

export class UpdateUserDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  about: string;

  @Expose()
  avatar: string;

  @Expose()
  thumbnail: string;

  @Expose()
  categories: Array<number>;

  @Expose()
  role: string;

  @Expose()
  money: number;
}
