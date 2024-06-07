import { Injectable } from "@nestjs/common";
import { BaseService } from "src/common/base/base.service";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { GiftEntity } from "./gift.entity";

@Injectable()
export class GiftService extends BaseService<GiftEntity> {
    constructor(@InjectRepository(GiftEntity) private readonly _repo: Repository<GiftEntity>){
        super(_repo)
    } 
}