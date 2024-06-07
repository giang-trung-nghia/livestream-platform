import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/base/base.service";
import { CommentEntity } from "./comment.entity";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class CommentService extends BaseService<CommentEntity> {
    constructor(@InjectRepository(CommentEntity) private readonly _repo: Repository<CommentEntity>){
        super(_repo)
    } 
}