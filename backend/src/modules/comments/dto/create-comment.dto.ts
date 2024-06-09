import { Expose } from 'class-transformer';
import { BaseDto } from 'src/common/base/base.dto';

export class CreateCommentDto extends BaseDto {
  @Expose()
  livestreamId: string;

  @Expose()
  userId: string;

  @Expose()
  userFullname: string;

  @Expose()
  content: string;

  @Expose()
  socketId: string;
}
