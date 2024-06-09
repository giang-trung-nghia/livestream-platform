import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { CommentEntity } from './comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { CommentService } from './comment.service';
import { CommentsGateway } from './comments.gateway';
import { Public } from 'src/common/public_key';

@Controller('comment')
export class CommentController extends BaseController<
  CommentEntity,
  CreateCommentDto,
  UpdateCommentDto
> {
  constructor(
    private readonly _service: CommentService,
    private commentsGateway: CommentsGateway,
  ) {
    super(_service);
  }

  @Public()
  @Get('/live/:id')
  async getAllCommentByLiveId(@Param() id: string): Promise<CommentEntity[]> {
    const newId = id;
    const result = await this._service.getAllCommentByLiveId(newId);
    return result;
  }

  @Post()
  async create(
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<CommentEntity> {
    this._service.create(createCommentDto);
    // Lưu comment vào database ở đây

    // Phát tin nhắn qua WebSocket
    this.commentsGateway.server.emit('newComment', createCommentDto);
    return createCommentDto as unknown as CommentEntity;
  }
}
