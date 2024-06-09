import {
  DeepPartial,
  DeleteResult,
  FindOptionsWhere,
  Repository,
  UpdateResult,
} from 'typeorm';
import { BaseEntity } from './base.entity';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { PagingResponse } from './paging-response.entity';
import { ObjectId } from 'mongodb';

export class BaseService<T extends BaseEntity> {
  constructor(protected repository: Repository<T>) {}

  async findAll(): Promise<T[]> {
    return await this.repository.find();
  }

  async findPaging(page: number, size: number): Promise<PagingResponse<T>> {
    const [data, total] = await this.repository.findAndCount({
      skip: (page - 1) * size,
      take: size,
    });
    return new PagingResponse<T>(data, total, page, size);
  }

  async findOneById(id: ObjectId): Promise<T> {
    return await this.repository.findOne({
      where: { _id: id } as FindOptionsWhere<T>,
    });
  }

  async create(data: DeepPartial<T>): Promise<T> {
    const entity = this.repository.create(data);
    return await this.repository.save(entity);
  }

  async update(
    id: string,
    partialEntity: QueryDeepPartialEntity<T>,
  ): Promise<UpdateResult> {
    const objectId = new ObjectId(id);
    return await this.repository.update(objectId, partialEntity);
  }

  async delete(id: string): Promise<DeleteResult> {
    const objectId = new ObjectId(id);
    return await this.repository.update(objectId, {
      deletedAt: new Date(),
    } as unknown as QueryDeepPartialEntity<T>);
  }
}
