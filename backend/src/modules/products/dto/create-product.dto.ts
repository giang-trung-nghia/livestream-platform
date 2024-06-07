import { Expose } from "class-transformer";
import { BaseDto } from "src/common/base/base.dto";

export class CreateProductDto extends BaseDto {
    @Expose()
    name: string

    @Expose()
    price: number
}