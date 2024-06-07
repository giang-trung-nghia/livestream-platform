import { Controller, Get } from '@nestjs/common';
import { BaseController } from 'src/common/base/base.controller';
import { CategoryEntity } from './category.entity';
import { CategoryService } from './category.service';
import { CategoryDto } from './dto/category.dto';
import { plainToInstance } from 'class-transformer';

@Controller('category')
export class CategoryController extends BaseController<
  CategoryEntity,
  CategoryDto,
  CategoryDto
> {
  constructor(private readonly _service: CategoryService) {
    super(_service);
  }

  @Get()
  async findAllDto(): Promise<CategoryDto[]> {
    const result = await this._service.findAll();

    return plainToInstance(CategoryDto, result, {
      excludeExtraneousValues: true,
    });
  }
}
