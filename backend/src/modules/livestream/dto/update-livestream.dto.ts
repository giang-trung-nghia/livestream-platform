import { Expose } from 'class-transformer';

export class UpdateLivestreamDto {
  @Expose()
  title: string;

  @Expose()
  view: number;

  @Expose()
  data: string;

  @Expose()
  thumbnail?: string;
}
