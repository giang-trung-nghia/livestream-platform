import { Module } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CommentController } from "./comment.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CommentEntity } from "./comment.entity";

@Module({
    imports: [
        TypeOrmModule.forFeature([CommentEntity])
    ],
    providers: [CommentService],
    controllers: [CommentController],
})
export class CommentModule {}