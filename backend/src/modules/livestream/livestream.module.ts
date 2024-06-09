import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivestreamEntity } from './livestream.entity';
import { LivestreamController } from './livestream.controller';
import { LivestreamService } from './livestream.service';
import { UsersModule } from '../users/users.module';
import { CategoryModule } from '../categories/category.module';

@Module({
  imports: [
    CategoryModule,
    UsersModule,
    TypeOrmModule.forFeature([LivestreamEntity]),
  ],
  controllers: [LivestreamController],
  providers: [LivestreamService],
  exports: [LivestreamService],
})
export class LiveStreamModule {}
