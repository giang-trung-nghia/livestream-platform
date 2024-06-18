import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/base/base.dto';

export class CreateUserDto extends BaseDto {
  @Expose()
  username: string;

  @Expose()
  password: string;

  @Expose()
  name: string;

  @Expose()
  email: string;

  @Expose()
  role: string;
}
