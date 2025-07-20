import { InputType, Field } from '@nestjs/graphql';

@InputType()
export class ResetPasswordInput {
  @Field()
  email: string;

  @Field()
  otp: string;

  @Field()
  newPassword: string;

  @Field()
  confirmNewPassword: string;
}
