import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { LivestreamEntity } from './livestream.entity';
import { LivestreamController } from './livestream.controller';
import { LivestreamService } from './livestream.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [UsersModule, TypeOrmModule.forFeature([LivestreamEntity])],
  controllers: [LivestreamController],
  providers: [LivestreamService],
  exports: [LivestreamService],
})
export class LiveStreamModule {}
