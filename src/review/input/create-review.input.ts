import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber } from 'class-validator';

@InputType()
export class CreateReviewInput {
  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  dermantin_id: number;

  @ApiProperty()
  @Field(() => Float)
  @IsNumber()
  ranking: number;

  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  user_id: number;
}
