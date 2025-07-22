import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, IsUrl } from 'class-validator';

@InputType()
export class CreateCategoryInput {
  @ApiProperty()
  @Field()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  logo?: string;
}
