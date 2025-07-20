import { InputType, Field } from '@nestjs/graphql';
import { IsEnum, IsOptional, IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { UserRole, UserRegion, UserLang } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @Field()
  @IsString()
  full_name: string;

@Field()
@IsString()
@Matches(/^\+998\d{9}$/, { message: 'Phone must be a valid Uzbekistan number' })
phone: string;


  @Field()
  @IsEmail()
  email: string;

  @Field()
  @MinLength(6)
  password: string;

  @Field()
  confirmPassword: string;

  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @Field(() => UserRegion, { nullable: true })
  @IsOptional()
  @IsEnum(UserRegion)
  region?: UserRegion;

  @Field(() => UserLang, { nullable: true })
  @IsOptional()
  @IsEnum(UserLang)
  lang?: UserLang;
}
