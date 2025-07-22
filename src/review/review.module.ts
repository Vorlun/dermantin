import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Review } from './entities/review.entity';
import { ReviewsResolver } from './review.resolver';
import { ReviewsController } from './review.controller';
import { ReviewsService } from './review.service';

@Module({
  imports: [TypeOrmModule.forFeature([Review])],
  providers: [ReviewsService, ReviewsResolver],
  controllers: [ReviewsController],
  exports: [ReviewsService],
})
export class ReviewsModule {}
