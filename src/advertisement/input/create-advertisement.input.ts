import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsDateString, IsInt, IsString } from 'class-validator';

@InputType()
export class CreateAdvertisementInput {
  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  dermantin_id: number;

  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  discount_percent: number;

  @ApiProperty()
  @Field()
  @IsString()
  type: string;

  @ApiProperty()
  @Field()
  @IsBoolean()
  status: boolean;

  @ApiProperty()
  @Field()
  @IsDateString()
  start_date: Date;

  @ApiProperty()
  @Field()
  @IsDateString()
  end_date: Date;
}
