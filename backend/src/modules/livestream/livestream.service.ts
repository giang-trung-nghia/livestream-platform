import {
  ForbiddenException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { LivestreamEntity } from './livestream.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PagingResponse } from 'src/common/base/paging-response.entity';
import { ObjectId } from 'mongodb';
import { UserService } from '../users/users.service';
import { v4 as uuidv4 } from 'uuid';
import { CreateLivestreamDto } from './dto/create-livestream.dto';

@Injectable()
export class LivestreamService extends BaseService<LivestreamEntity> {
  constructor(
    @InjectRepository(LivestreamEntity)
    private readonly _repo: Repository<LivestreamEntity>,
    private readonly _userService: UserService,
  ) {
    super(_repo);
  }

  async findLastestLiveByUserId(id: string): Promise<LivestreamEntity> {
    const latestLivestream = await this._repo.findOne({
      where: {
        userId: id as unknown as ObjectId,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (
      latestLivestream &&
      this.isStreamKeyExpires(latestLivestream.streamKeyExpiresAt)
    ) {
      latestLivestream.streamingKey =
        latestLivestream.streamingKey +
        '?liveId=' +
        latestLivestream._id +
        '&userId=' +
        latestLivestream.userId;
      return latestLivestream;
    }
    return null;
  }

  async findPaging(
    page: number,
    size: number,
  ): Promise<PagingResponse<LivestreamEntity>> {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      where: {
        endTime: null,
      },
    });
    return new PagingResponse<LivestreamEntity>(data, total, page, size);
  }

  async create(data: CreateLivestreamDto): Promise<LivestreamEntity> {
    data.createdAt = new Date();
    data.updatedAt = new Date();
    console.log(data);

    const entity = await this._repo.save(data);
    console.log(entity);
    entity.startTime = new Date();

    const result = this.generateStreamKey(entity);
    await this._repo.update(result._id, result);
    result.streamingKey = await this.getStreamingKey(result._id.toString());
    return result;
  }

  async startLivestream(
    userId: string,
    liveId: string,
    key: string,
  ): Promise<LivestreamEntity> {
    if (userId == null) {
      throw new ForbiddenException('Id invalid');
    }
    const liveIdObj = new ObjectId(liveId);
    console.log(liveIdObj);

    const live = await this._repo.findOneBy({
      _id: liveIdObj,
    });
    if (live == null) {
      console.log('not found live with liveId');

      throw new NotFoundException('not found live with liveId');
    }
    console.log(live);

    if (!this.authenticateStreamKey(liveId, key)) {
      throw new ForbiddenException('Stream key is not valid');
    }
    console.log('authenticate success');

    live.startTime = new Date();
    this.repository.update(live._id, live);
    return live;
  }

  async endLivestream(_id: ObjectId): Promise<LivestreamEntity> {
    const live = await this.repository.findOne({
      where: {
        _id,
      },
    });
    live.endTime = new Date();
    this.repository.update(_id, live);
    return live;
  }

  async getStreamingKey(id: string): Promise<string> {
    const latestLivestream = await this.findLastestLiveByUserId(id);

    if (
      latestLivestream &&
      this.isStreamKeyExpires(latestLivestream.streamKeyExpiresAt)
    ) {
      return (
        latestLivestream.streamingKey +
        '?liveId=' +
        latestLivestream._id +
        '&userId=' +
        latestLivestream.userId
      );
    }
    return null;
  }

  generateStreamKey(live: LivestreamEntity): LivestreamEntity {
    live.streamKeyExpiresAt = new Date();
    live.streamingKey = uuidv4();

    return live;
  }

  async authenticateStreamKey(
    liveId: string,
    streamKey: string,
  ): Promise<boolean> {
    const liveIdObj = new ObjectId(liveId);
    const livestream = await this._repo.findOneBy({
      _id: liveIdObj,
    });
    console.log('authenticate start');
    console.log(streamKey);
    console.log(livestream.streamingKey);
    console.log('authenticate process');

    if (
      livestream.streamingKey === streamKey &&
      this.isStreamKeyExpires(livestream.streamKeyExpiresAt)
    ) {
      return true;
    }
    return false;
  }

  isStreamKeyExpires(expiresAt: Date): boolean {
    if (expiresAt < new Date()) {
      return true;
    } else {
      throw new ForbiddenException('expired streaming key');
    }
  }
}
