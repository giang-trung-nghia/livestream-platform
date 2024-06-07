import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';
import { ObjectId } from 'mongodb';

@Entity()
export class GiftEntity extends BaseEntity {
  @Column({ nullable: false })
  fromUserId: ObjectId;

  @Column({ nullable: false })
  toUserId: ObjectId;

  @Column({ nullable: false })
  livestreamId: ObjectId;

  @Column()
  productId: ObjectId;
}
