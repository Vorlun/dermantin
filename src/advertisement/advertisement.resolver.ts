import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AdvertisementsService } from './advertisement.service';
import { Advertisement } from './entities/advertisement.entity';
import { CreateAdvertisementInput } from './input/create-advertisement.input';
import { UpdateAdvertisementInput } from './input/update-advertisement.input';

@Resolver(() => Advertisement)
export class AdvertisementsResolver {
  constructor(private readonly advertisementsService: AdvertisementsService) {}

  @Mutation(() => Advertisement)
  createAdvertisement(@Args('createAdvertisementInput') input: CreateAdvertisementInput) {
    return this.advertisementsService.create(input);
  }

  @Query(() => [Advertisement], { name: 'advertisements' })
  findAll() {
    return this.advertisementsService.findAll();
  }

  @Query(() => Advertisement, { name: 'advertisement' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.advertisementsService.findOne(id);
  }

  @Mutation(() => Advertisement)
  updateAdvertisement(@Args('id', { type: () => Int }) id: number, @Args('updateAdvertisementInput') input: UpdateAdvertisementInput) {
    return this.advertisementsService.update(id, input);
  }

  @Mutation(() => Advertisement)
  removeAdvertisement(@Args('id', { type: () => Int }) id: number) {
    return this.advertisementsService.remove(id);
  }
}
