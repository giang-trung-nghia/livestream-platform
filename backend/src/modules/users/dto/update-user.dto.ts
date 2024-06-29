import { Expose } from 'class-transformer';

export class UpdateUserDto {
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

  @Expose()
  isActive: boolean;

  @Expose()
  createdAt: Date;

  @Expose()
  updatedAt: Date;

  @Expose()
  deleteAt: Date;
}
