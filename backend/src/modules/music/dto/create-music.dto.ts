import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/base/base.dto';

export class CreateMusicDto extends BaseDto {
  @Expose()
  name: string;

  @Expose()
  link: string;

  @Expose()
  author: string;

  @Expose()
  listenCount: number;
}
