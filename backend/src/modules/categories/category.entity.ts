import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'category',
})
export class CategoryEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  value: number;
}
