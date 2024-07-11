import {
  BadRequestException,
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
import { CategoryService } from '../categories/category.service';

@Injectable()
export class LivestreamService extends BaseService<LivestreamEntity> {
  constructor(
    @InjectRepository(LivestreamEntity)
    private readonly _repo: Repository<LivestreamEntity>,
    private readonly _userService: UserService,
    private readonly _categoryService: CategoryService,
  ) {
    super(_repo);
  }

  async findLastestLiveByUserId(id: string): Promise<LivestreamEntity> {
    const latestLivestream = await this._repo.findOne({
      where: {
        userId: id as unknown as ObjectId,
        endTime: null,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (
      latestLivestream &&
      !this.isStreamKeyExpired(latestLivestream.streamKeyExpiresAt)
    ) {
      latestLivestream.streamingKey =
        this.generateStreamingKey(latestLivestream);
      return latestLivestream;
    }

    if (latestLivestream == null) {
      throw new NotFoundException('Not found live stream!');
    }
    return null;
  }

  async findLastestLiveByUsername(username: string): Promise<LivestreamEntity> {
    const latestLivestream = await this._repo.findOne({
      where: {
        username: username,
        endTime: null,
      },
      order: {
        createdAt: 'DESC',
      },
    });

    if (!latestLivestream) {
      throw new BadRequestException('Not have livestream');
    } else {
      if (!this.isStreamKeyExpired(latestLivestream.streamKeyExpiresAt)) {
        latestLivestream.streamingKey =
          this.generateStreamingKey(latestLivestream);

        return latestLivestream;
      }
      // this.endLivestream(latestLivestream._id);
      throw new BadRequestException('Livestream is end');
    }
  }

  async findPagingFilter(
    page: number,
    size: number,
    category: string,
  ): Promise<PagingResponse<LivestreamEntity>> {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * size,
      take: size,
      where: {
        endTime: null,
      },
      order: {
        startTime: 'DESC',
      },
    });

    const listCategory = await this._categoryService.findAll();
    let dataFiltered = data;
    if (category) {
      const categoryId = parseInt(category, 10);
      dataFiltered = data.filter((x) => x.categories.includes(categoryId));
    }

    const dataWithUser = await Promise.all(
      dataFiltered.map(async (live) => {
        const user = await this._userService.findOneById(live.userId);
        return {
          ...live,
          name: user?.name,
          username: user?.username,
          avatar: user?.avatar,
          thumbnail: user?.thumbnail,
          categories: listCategory
            .filter((x) => live.categories.includes(x.value))
            .map((e) => e.name),
        };
      }),
    );

    return new PagingResponse<any>(dataWithUser, total, page, size);
  }

  async create(data: CreateLivestreamDto): Promise<LivestreamEntity> {
    const user = await this._userService.findOneById(data.userId);
    if (!user.isActive) {
      throw new ForbiddenException(
        'Banned users please contact the administrator for assistance',
      );
    }
    const formatdata = { ...data, categories: user.categories };

    const entity = await this._repo.save(formatdata);

    data.createdAt = new Date();
    data.updatedAt = new Date();
    const result = this.generateRtmpKey(entity);
    result.username = user.username;
    result.streamingKey = this.generateStreamingKey(result);

    await this._repo.update(result._id, result);
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

    const live = await this._repo.findOneBy({
      _id: liveIdObj,
    });
    if (live == null) {
      console.log('not found live with liveId');

      throw new NotFoundException('not found live with liveId');
    }

    if (live.endTime) {
      console.log('Livestream ended');

      throw new BadRequestException('livestream ended');
    }

    if (!this.authenticateStreamKey(liveId, key)) {
      throw new ForbiddenException('Stream key is not valid');
    }

    live.startTime = new Date();
    this.repository.update(live._id, live);
    return live;
  }

  async endLivestream(id: string | ObjectId): Promise<LivestreamEntity> {
    const oId = new ObjectId(id);
    const live = await this._repo.findOne({
      where: {
        _id: oId,
      },
    });
    if (live) {
      if (live.endTime != null) {
        throw new BadRequestException('Live was ended');
      }
      live.endTime = new Date();
      this.repository.update(id, live);
    } else {
      throw new BadRequestException("Can't found livestream with Id :" + id);
    }
    return live;
  }

  async getStreamingKey(id: string): Promise<string> {
    const latestLivestream = await this.findLastestLiveByUserId(id);

    if (latestLivestream) {
      return this.generateStreamingKey(latestLivestream);
    }
    return null;
  }

  generateStreamingKey(live: LivestreamEntity): string {
    return live.rtmpKey + '?liveId=' + live._id + '&userId=' + live.userId;
  }

  generateRtmpKey(live: LivestreamEntity): LivestreamEntity {
    const date = new Date();
    date.setDate(date.getDate() + 1);
    live.streamKeyExpiresAt = date;
    live.rtmpKey = uuidv4();

    return live;
  }

  async authenticateStreamKey(
    liveId: string,
    rtmpKey: string,
  ): Promise<boolean> {
    const liveIdObj = new ObjectId(liveId);
    const livestream = await this._repo.findOneBy({
      _id: liveIdObj,
    });
    console.log(livestream.rtmpKey);
    console.log('authenticate process');

    if (
      livestream.rtmpKey === rtmpKey &&
      this.isStreamKeyExpired(livestream.streamKeyExpiresAt)
    ) {
      return true;
    }
    return false;
  }

  isStreamKeyExpired(expiresAt: Date): boolean {
    const currentTime = new Date();
    if (currentTime > expiresAt) {
      return true;
    } else {
      return false;
    }
  }

  async refreshExpires() {
    const lives = await this._repo.find({
      where: {
        endTime: null,
      },
    });
    const date = new Date();
    date.setDate(date.getDate() + 1);

    lives.forEach((e) => {
      e.streamKeyExpiresAt = date;
    });

    await this._repo.save(lives);
  }
}
