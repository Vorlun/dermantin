import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { DermantinsService } from './dermantin.service';
import { Dermantin } from './entities/dermantin.entity';
import { CreateDermantinInput } from './input/create-dermantin.input';
import { UpdateDermantinInput } from './input/update-dermantin.input';

@Resolver(() => Dermantin)
export class DermantinsResolver {
  constructor(private readonly dermantinsService: DermantinsService) {}

  @Mutation(() => Dermantin)
  createDermantin(@Args('createDermantinInput') input: CreateDermantinInput) {
    return this.dermantinsService.create(input);
  }

  @Query(() => [Dermantin], { name: 'dermantins' })
  findAll() {
    return this.dermantinsService.findAll();
  }

  @Query(() => Dermantin, { name: 'dermantin' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.dermantinsService.findOne(id);
  }

  @Mutation(() => Dermantin)
  updateDermantin(@Args('id', { type: () => Int }) id: number, @Args('updateDermantinInput') input: UpdateDermantinInput) {
    return this.dermantinsService.update(id, input);
  }

  @Mutation(() => Dermantin)
  removeDermantin(@Args('id', { type: () => Int }) id: number) {
    return this.dermantinsService.remove(id);
  }
}
