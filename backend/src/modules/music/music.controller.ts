import { Controller } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { MusicEntity } from './music.entity';
import { CreateMusicDto } from './dto/create-music.dto';
import { MusicService } from './music.service';

@Controller('music')
export class MusicController extends BaseController<
  MusicEntity,
  CreateMusicDto,
  CreateMusicDto
> {
  constructor(private readonly _service: MusicService) {
    super(_service);
  }
}
