import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { CategoriesService } from './category.service';
import { Category } from './entities/category.entity';
import { CreateCategoryInput } from './input/create-category.input';
import { UpdateCategoryInput } from './input/update-category.input';

@Resolver(() => Category)
export class CategoriesResolver {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Mutation(() => Category)
  createCategory(@Args('createCategoryInput') input: CreateCategoryInput) {
    return this.categoriesService.create(input);
  }

  @Query(() => [Category], { name: 'categories' })
  findAll() {
    return this.categoriesService.findAll();
  }

  @Query(() => Category, { name: 'category' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.findOne(id);
  }

  @Mutation(() => Category)
  updateCategory(@Args('id', { type: () => Int }) id: number, @Args('updateCategoryInput') input: UpdateCategoryInput) {
    return this.categoriesService.update(id, input);
  }

  @Mutation(() => Category)
  removeCategory(@Args('id', { type: () => Int }) id: number) {
    return this.categoriesService.remove(id);
  }
}
