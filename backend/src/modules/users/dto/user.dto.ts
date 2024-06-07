import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/base/base.dto';

export class UserDto extends BaseDto {
  @Expose()
  username: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  about: string;

  @Expose()
  address: string;

  @Expose()
  dob: string;

  @Expose()
  role: string;
}
