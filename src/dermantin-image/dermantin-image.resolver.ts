import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DermantinImagesService } from './dermantin-image.service';
import { DermantinImage } from './entities/dermantin-image.entity';
import { CreateDermantinImageInput } from './input/create-dermantin-image.input';
import { UpdateDermantinImageInput } from './input/update-dermantin-image.input';

@Resolver(() => DermantinImage)
export class DermantinImagesResolver {
  constructor(private readonly dermantinImagesService: DermantinImagesService) {}

  @Mutation(() => DermantinImage)
  createDermantinImage(@Args('createDermantinImageInput') input: CreateDermantinImageInput) {
    return this.dermantinImagesService.create(input);
  }

  @Query(() => [DermantinImage], { name: 'dermantinImages' })
  findAll() {
    return this.dermantinImagesService.findAll();
  }

  @Query(() => DermantinImage, { name: 'dermantinImage' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dermantinImagesService.findOne(id);
  }

  @Mutation(() => DermantinImage)
  updateDermantinImage(@Args('id', { type: () => Int }) id: number, @Args('updateDermantinImageInput') input: UpdateDermantinImageInput) {
    return this.dermantinImagesService.update(id, input);
  }

  @Mutation(() => DermantinImage)
  removeDermantinImage(@Args('id', { type: () => Int }) id: number) {
    return this.dermantinImagesService.remove(id);
  }
}
