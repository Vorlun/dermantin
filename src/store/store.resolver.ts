import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { StoresService } from './store.service';
import { Store } from './entities/store.entity';
import { CreateStoreInput } from './input/create-store.input';
import { UpdateStoreInput } from './input/update-store.input';

@Resolver(() => Store)
export class StoresResolver {
  constructor(private readonly storesService: StoresService) {}

  @Mutation(() => Store)
  createStore(@Args('createStoreInput') input: CreateStoreInput) {
    return this.storesService.create(input);
  }

  @Query(() => [Store], { name: 'stores' })
  findAll() {
    return this.storesService.findAll();
  }

  @Query(() => Store, { name: 'store' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.storesService.findOne(id);
  }

  @Mutation(() => Store)
  updateStore(@Args('id', { type: () => Int }) id: number, @Args('updateStoreInput') input: UpdateStoreInput) {
    return this.storesService.update(id, input);
  }

  @Mutation(() => Store)
  removeStore(@Args('id', { type: () => Int }) id: number) {
    return this.storesService.remove(id);
  }
}
