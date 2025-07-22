import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { HistoriesService } from './histories.service';
import { History } from './entities/history.entity';
import { CreateHistoryInput } from './input/create-history.input';
import { UpdateHistoryinput } from './input/update-history.input';

@Resolver(() => History)
export class HistoriesResolver {
  constructor(private readonly historiesService: HistoriesService) {}

  @Mutation(() => History)
  createHistory(@Args('createHistoryInput') input: CreateHistoryInput) {
    return this.historiesService.create(input);
  }

  @Query(() => [History], { name: 'histories' })
  findAll() {
    return this.historiesService.findAll();
  }

  @Query(() => History, { name: 'history' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.historiesService.findOne(id);
  }

  @Mutation(() => History)
  updateHistory(@Args('id', { type: () => Int }) id: number, @Args('updateHistoryInput') input: UpdateHistoryinput) {
    return this.historiesService.update(id, input);
  }

  @Mutation(() => History)
  removeHistory(@Args('id', { type: () => Int }) id: number) {
    return this.historiesService.remove(id);
  }
}
