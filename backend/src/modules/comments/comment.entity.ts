import { ObjectId } from 'mongodb';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'comment',
})
export class CommentEntity extends BaseEntity {
  @Column({ nullable: false })
  livestreamId: ObjectId;

  @Column({ nullable: false })
  userId: ObjectId;

  @Column({ nullable: false })
  content: string;
}
