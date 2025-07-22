import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { ReviewsService } from './review.service';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './input/create-review.input';
import { UpdateReviewInput } from './input/update-review.input';

@Resolver(() => Review)
export class ReviewsResolver {
  constructor(private readonly reviewsService: ReviewsService) {}

  @Mutation(() => Review)
  createReview(@Args('createReviewInput') input: CreateReviewInput) {
    return this.reviewsService.create(input);
  }

  @Query(() => [Review], { name: 'reviews' })
  findAll() {
    return this.reviewsService.findAll();
  }

  @Query(() => Review, { name: 'review' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.reviewsService.findOne(id);
  }

  @Mutation(() => Review)
  updateReview(@Args('id', { type: () => Int }) id: number, @Args('updateReviewInput') input: UpdateReviewInput) {
    return this.reviewsService.update(id, input);
  }

  @Mutation(() => Review)
  removeReview(@Args('id', { type: () => Int }) id: number) {
    return this.reviewsService.remove(id);
  }
}
