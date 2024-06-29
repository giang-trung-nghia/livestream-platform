import { Body, Controller, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { LivestreamEntity } from './livestream.entity';
import { CreateLivestreamDto } from './dto/create-livestream.dto';
import { UpdateLivestreamDto } from './dto/update-livestream.dto';
import { LivestreamService } from './livestream.service';
import { PagingResponse } from 'src/common/base/paging-response.entity';
import { Public } from 'src/common/public_key';

@Controller('live')
export class LivestreamController extends BaseController<
  LivestreamEntity,
  CreateLivestreamDto,
  UpdateLivestreamDto
> {
  constructor(private readonly _livestreamService: LivestreamService) {
    super(_livestreamService);
  }

  @Public()
  @Get('paging')
  async findPagingFilter(
    @Query('page') page: number = 1,
    @Query('size') size: number = 20,
    @Query('category') category: string,
  ): Promise<PagingResponse<LivestreamEntity>> {
    return this._livestreamService.findPagingFilter(page, size, category);
  }

  @Post('')
  async create(
    @Body() createDto: CreateLivestreamDto,
  ): Promise<LivestreamEntity> {
    const result = await this._livestreamService.create(createDto);
    return result;
  }

  @Put('/end/:id')
  async endLivestream(@Param('id') id: string): Promise<LivestreamEntity> {
    return this._livestreamService.endLivestream(id);
  }

  @Get('/streamingkey/:id')
  async getStreamingKey(@Param('id') id: string): Promise<string> {
    const result = await this._livestreamService.getStreamingKey(id);

    return result;
  }

  @Get('/user/:id')
  async getStreamingByUserId(
    @Param('id') id: string,
  ): Promise<LivestreamEntity> {
    const result = await this._livestreamService.findLastestLiveByUserId(id);
    return result;
  }

  @Public()
  @Get('/username/:username')
  async getStreamingByUsername(
    @Param('username') username: string,
  ): Promise<LivestreamEntity> {
    const result =
      await this._livestreamService.findLastestLiveByUsername(username);

    return result;
  }

  @Public()
  @Post('/start')
  async startLivestream(
    @Query('key') key: string,
    @Query('userId') id: string,
    @Body() body: any,
  ): Promise<any> {
    const result = await this._livestreamService.startLivestream(
      id,
      body.liveId,
      key,
    );
    return result;
  }

  @Public()
  @Get('/refreshExpires')
  async refreshExpires() {
    await this._livestreamService.refreshExpires();
  }
}
