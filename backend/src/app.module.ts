import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { AuthModule } from './modules/auth/auth.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { LiveStreamModule } from './modules/livestream/livestream.module';
import { join } from 'path';
import { CommentModule } from './modules/comments/comment.module';
import { GiftModule } from './modules/gifts/gift.module';
import { CategoryModule } from './modules/categories/category.module';
import { CommentsGateway } from './modules/comments/comments.gateway';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => ({
        type: 'mongodb',
        database: 'livestream-platform',
        url: config.get<string>('MONGO_URI'),
        useUnifiedTopology: true,
        entities: [join(__dirname, '**', '*.entity.{ts,js}')],
        synchronize: true, // migration
      }),
    }),
    UsersModule,
    AuthModule,
    LiveStreamModule,
    CommentModule,
    GiftModule,
    CategoryModule,
  ],
  controllers: [AppController],
  providers: [AppService, CommentsGateway],
})
export class AppModule {}
