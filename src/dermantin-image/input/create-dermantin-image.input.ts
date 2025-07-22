import { Field, InputType, Int } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsInt, IsUrl } from 'class-validator';

@InputType()
export class CreateDermantinImageInput {
  @ApiProperty()
  @Field(() => Int)
  @IsInt()
  dermantin_id: number;

  @ApiProperty()
  @Field()
  @IsUrl()
  image_url: string;

  @ApiProperty()
  @Field()
  @IsBoolean()
  is_main: boolean;
}
