import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { MusicEntity } from './music.entity';

@Injectable()
export class MusicService extends BaseService<MusicEntity> {
  constructor(
    @InjectRepository(MusicEntity)
    private readonly _repo: Repository<MusicEntity>,
  ) {
    super(_repo);
  }
}
