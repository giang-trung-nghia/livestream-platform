import { Expose } from 'class-transformer';

export class CategoryDto {
  @Expose()
  name: string;

  @Expose()
  value: number;
}
