import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsUrl } from 'class-validator';
import { Region } from 'src/enum/region.enum';

@InputType()
export class CreateStoreInput {
  @ApiProperty()
  @Field()
  @IsString()
  name: string;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  @IsUrl()
  logo_url?: string;

  @ApiProperty({ enum: Region })
  @Field(() => Region)
  @IsEnum(Region)
  region: Region;

  @ApiProperty({ required: false })
  @Field({ nullable: true })
  @IsOptional()
  description?: string;
}
