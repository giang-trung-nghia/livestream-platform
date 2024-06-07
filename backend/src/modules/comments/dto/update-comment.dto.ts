import { Expose } from "class-transformer";
import { BaseDto } from "src/common/base/base.dto";

export class UpdateCommentDto extends BaseDto {
    @Expose()
    content: string
}