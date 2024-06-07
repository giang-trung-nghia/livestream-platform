import { Controller } from "@nestjs/common";
import { BaseController } from "src/common/base/base.controller";
import { GiftEntity } from "./gift.entity";
import { CreateGiftDto } from "./dto/create-gift.dto";
import { GiftService } from "./gift.service";

@Controller('gift')
export class GiftController extends BaseController<GiftEntity, CreateGiftDto, CreateGiftDto> {
    constructor(private readonly _service: GiftService) {
        super(_service)
    }
}