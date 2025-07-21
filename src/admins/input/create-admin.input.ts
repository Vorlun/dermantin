import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

@InputType()
export class CreateAdminInput {
  @ApiProperty()
  @Field()
  @IsString()
  full_name: string;

  @ApiProperty()
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Field()
  @IsPhoneNumber()
  phone: string;

  @ApiProperty()
  @Field()
  @MinLength(6)
  password: string;
}
