import { Controller } from "@nestjs/common";
import { BaseController } from "src/common/base/base.controller";
import { ProductEntity } from "./product.entity";
import { CreateProductDto } from "./dto/create-product.dto";
import { UpdateProductDto } from "./dto/update-product.dto";
import { ProductService } from "./product.service";

@Controller()
export class ProductController extends BaseController<ProductEntity, CreateProductDto, UpdateProductDto> {
    constructor(private readonly _service: ProductService) {
        super(_service);
    }
}