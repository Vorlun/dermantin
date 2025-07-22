import { Field, Float, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNumber, IsOptional, IsString } from 'class-validator';

@InputType()
export class CreateDermantinInput {
  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  store_id: number;

  @ApiProperty()
  @Field()
  @IsString()
  name: string;

  @ApiProperty()
  @Field(() => Float)
  @IsNumber()
  price: number;

  @ApiProperty({ required: false })
  @Field(() => Float, { nullable: true })
  @IsOptional()
  @IsNumber()
  rating?: number;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsString()
  class?: string;

  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  category_id: number;
}
