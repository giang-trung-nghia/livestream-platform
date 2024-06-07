import { Injectable } from '@nestjs/common';
import { BaseService } from 'src/common/base/base.service';
import { ProductEntity } from './product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class ProductService extends BaseService<ProductEntity> {
  constructor(
    @InjectRepository(ProductEntity)
    private readonly _repo: Repository<ProductEntity>,
  ) {
    super(_repo);
  }
}
