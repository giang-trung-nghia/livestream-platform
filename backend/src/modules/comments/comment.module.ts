import { Module } from '@nestjs/common';
import { CommentService } from './comment.service';
import { CommentController } from './comment.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CommentEntity } from './comment.entity';
import { CommentsGateway } from './comments.gateway';

@Module({
  imports: [TypeOrmModule.forFeature([CommentEntity])],
  providers: [CommentService, CommentsGateway],
  controllers: [CommentController],
  exports: [CommentsGateway],
})
export class CommentModule {}
