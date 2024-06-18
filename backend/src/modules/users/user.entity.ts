import { Column, Entity } from 'typeorm';
import { CommentEntity } from '../comments/comment.entity';
import { BaseEntity } from 'src/common/base/base.entity';

@Entity({
  name: 'user',
})
export class UserEntity extends BaseEntity {
  @Column()
  username: string;

  @Column()
  name: string;

  @Column()
  email: string;

  @Column({
    length: 50,
  })
  password: string;

  @Column({
    type: 'enum',
    enum: ['admin', 'user'],
    default: 'user',
  })
  role: string;

  @Column()
  dob: string;

  @Column()
  money: number;

  @Column()
  avatar: string;

  @Column()
  thumbnail: string;

  @Column()
  categories: Array<number>;

  @Column()
  comment: CommentEntity;

  @Column()
  about: string;

  @Column()
  address: string;
}
