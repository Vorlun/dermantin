import { Field, InputType } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { MinLength } from 'class-validator';

@InputType('ChangeAdminPasswordInput')
export class ChangeAdminPasswordInput {
  @ApiProperty()
  @Field()
  oldPassword: string;

  @ApiProperty()
  @Field()
  @MinLength(6)
  newPassword: string;

  @ApiProperty()
  @Field()
  @MinLength(6)
  confirmNewPassword: string;
}
