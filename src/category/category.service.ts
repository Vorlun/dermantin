import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './input/create-category.input';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category) private categoryRepo: Repository<Category>,
  ) {}

  create(input: CreateCategoryInput): Promise<Category> {
    const category = this.categoryRepo.create(input);
    return this.categoryRepo.save(category);
  }

  findAll(): Promise<Category[]> {
    return this.categoryRepo.find({ relations: ['dermantins'] });
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepo.findOne({
      where: { id },
      relations: ['dermantins'],
    });
    if (!category) throw new NotFoundException('Category not found');
    return category;
  }

  async update(id: number, input: Partial<CreateCategoryInput>): Promise<Category> {
    const category = await this.findOne(id);
    Object.assign(category, input);
    return this.categoryRepo.save(category);
  }

  async remove(id: number): Promise<Category> {
    const category = await this.findOne(id);
    await this.categoryRepo.remove(category);
    return category;
  }
}
