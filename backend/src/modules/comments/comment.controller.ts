import { Controller } from "@nestjs/common";
import { BaseController } from "src/common/base/base.controller";
import { CommentEntity } from "./comment.entity";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { UpdateCommentDto } from "./dto/update-comment.dto";
import { CommentService } from "./comment.service";

@Controller('comment')
export class CommentController extends BaseController<CommentEntity, CreateCommentDto, UpdateCommentDto> {
    constructor(private readonly _service: CommentService) {
        super(_service)
    }
}