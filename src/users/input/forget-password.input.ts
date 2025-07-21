import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEmail } from 'class-validator';

@InputType()
export class ForgotPasswordInput {
  @ApiProperty()
  @Field()
  @IsEmail()
  email: string;
}
