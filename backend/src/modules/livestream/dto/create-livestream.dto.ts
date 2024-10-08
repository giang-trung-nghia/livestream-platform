import { Expose } from 'class-transformer';
import { IsNotEmpty } from 'class-validator';
import { ObjectId } from 'mongodb';
import { BaseDto } from 'src/common/base/base.dto';

export class CreateLivestreamDto extends BaseDto {
  @Expose()
  @IsNotEmpty()
  title: string;

  @Expose()
  @IsNotEmpty()
  userId: ObjectId;

  @Expose()
  categories: Array<number>;
}
