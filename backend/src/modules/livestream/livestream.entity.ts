import { ObjectId } from 'mongodb';
import { BaseEntity } from 'src/common/base/base.entity';
import { Column, Entity } from 'typeorm';

@Entity({
  name: 'livestream',
})
export class LivestreamEntity extends BaseEntity {
  @Column({ nullable: false })
  title: string;

  @Column()
  view: number;

  @Column()
  startTime: Date;

  @Column()
  endTime: Date;

  @Column()
  userId: ObjectId;

  @Column()
  username: string;

  @Column()
  avatar: string;

  @Column()
  thumbnail: string;

  @Column()
  data: string;

  @Column()
  streamingKey: string;

  @Column()
  rtmpKey: string;

  @Column()
  streamKeyExpiresAt: Date;

  @Column()
  categories: Array<number>;
}
