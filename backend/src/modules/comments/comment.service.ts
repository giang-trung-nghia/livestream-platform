import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { CommentEntity } from './comment.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ObjectId } from 'mongodb';

@Injectable()
export class CommentService extends BaseService<CommentEntity> {
  constructor(
    @InjectRepository(CommentEntity)
    private readonly _repo: Repository<CommentEntity>,
  ) {
    super(_repo);
  }

  async getAllCommentByLiveId(id: string): Promise<CommentEntity[]> {
    const oId = new ObjectId(id);
    const idHex = oId.toString();
    const comments = await this._repo.find({
      where: {
        livestreamId: idHex,
      },
    });

    return comments;
  }
}
