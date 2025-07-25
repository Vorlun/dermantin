import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesService } from './category.service';
import { CategoriesResolver } from './categoty.resolver';
import { CategoriesController } from './category.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService, CategoriesResolver],
  controllers: [CategoriesController],
  exports: [CategoriesService],
})
export class CategoriesModule {}
