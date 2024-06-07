import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/base/base.dto';

export class UpdateUserDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  password: string;

  @Expose()
  about: string;

  @Expose()
  address: string;

  @Expose()
  role: string;

  @Expose()
  money: number;
}
