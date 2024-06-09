import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'comment',
})
export class CommentEntity extends BaseEntity {
  @Column()
  livestreamId: string;

  @Column()
  userId: string;

  @Column()
  userFullname: string;

  @Column()
  content: string;
}
