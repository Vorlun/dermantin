import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength, IsEmail } from 'class-validator';

@InputType()
export class ResetPasswordInput {
  @ApiProperty()
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Field()
  otp: string;

  @ApiProperty()
  @Field()
  @MinLength(6)
  newPassword: string;

  @ApiProperty()
  @Field()
  @MinLength(6)
  confirmNewPassword: string;
}
