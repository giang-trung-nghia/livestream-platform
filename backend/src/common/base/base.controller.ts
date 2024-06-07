import { Body, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { BaseService } from './base.service';
import { BaseEntity } from './base.entity';
import { PagingResponse } from './paging-response.entity';
import { DeepPartial } from 'typeorm';
import { QueryDeepPartialEntity } from 'typeorm/query-builder/QueryPartialEntity';
import { ObjectId } from 'mongodb';

export class BaseController<T extends BaseEntity, CreateDto, UpdateDto> {
  constructor(private readonly baseService: BaseService<T>) {}

  @Get()
  async findAll(): Promise<T[]> {
    return this.baseService.findAll();
  }

  @Get('paging')
  async findPaging(
    @Query('page') page: number = 1,
    @Query('size') size: number = 10,
  ): Promise<PagingResponse<T>> {
    return this.baseService.findPaging(page, size);
  }

  @Get(':id')
  async findOneById(@Param('id') id: string): Promise<T> {
    const objectId = new ObjectId(id);
    return this.baseService.findOneById(objectId);
  }

  @Post()
  async create(@Body() createDto: CreateDto): Promise<T> {
    return this.baseService.create(createDto as DeepPartial<T>);
  }

  @Put(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDto: UpdateDto,
  ): Promise<T> {
    const objectId = new ObjectId(id);

    await this.baseService.update(id, updateDto as QueryDeepPartialEntity<T>);
    return this.baseService.findOneById(objectId);
  }

  @Delete(':id')
  async delete(@Param('id') id: string): Promise<void> {
    await this.baseService.delete(id);
  }
}
