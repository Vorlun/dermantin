import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { CreateReviewInput } from './input/create-review.input';

@Injectable()
export class ReviewsService {
  constructor(
    @InjectRepository(Review) private reviewRepo: Repository<Review>,
  ) {}

  create(input: CreateReviewInput): Promise<Review> {
    const review = this.reviewRepo.create(input);
    return this.reviewRepo.save(review);
  }

  findAll(): Promise<Review[]> {
    return this.reviewRepo.find({ relations: ['dermantin', 'user'] });
  }

  async findOne(id: number): Promise<Review> {
    const review = await this.reviewRepo.findOne({
      where: { id },
      relations: ['dermantin', 'user'],
    });
    if (!review) throw new NotFoundException('Review not found');
    return review;
  }

  async update(id: number, input: Partial<CreateReviewInput>): Promise<Review> {
    const review = await this.findOne(id);
    Object.assign(review, input);
    return this.reviewRepo.save(review);
  }

  async remove(id: number): Promise<Review> {
    const review = await this.findOne(id);
    await this.reviewRepo.remove(review);
    return review;
  }
}
