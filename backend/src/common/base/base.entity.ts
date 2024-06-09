import { Column, ObjectIdColumn } from 'typeorm';
import { ObjectId } from 'mongodb';
export class BaseEntity {
  @ObjectIdColumn()
  _id: ObjectId;

  @Column()
  createdAt: Date;

  @Column()
  updatedAt: Date;

  @Column({ nullable: true })
  deleteAt: Date;
}
