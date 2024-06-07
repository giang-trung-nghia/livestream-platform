import { Expose } from 'class-transformer';
import { ObjectId } from 'mongodb';

export class BaseDto {
  @Expose()
  _id: ObjectId;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deleteAt: Date;
}
