import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity('music')
export class MusicEntity extends BaseEntity {
  @Column()
  name: string;

  @Column()
  link: string;

  @Column()
  author: string;

  @Column()
  listenCount: number;
}
