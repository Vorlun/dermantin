import { InputType, Field } from '@nestjs/graphql';
import { ApiProperty } from '@nestjs/swagger';
import { IsEnum, IsOptional, IsString, IsEmail, MinLength, Matches } from 'class-validator';
import { UserRole, UserRegion, UserLang } from '../entities/user.entity';

@InputType()
export class CreateUserInput {
  @ApiProperty()
  @Field()
  @IsString()
  full_name: string;

  @ApiProperty()
  @Field()
  @IsString()
  @Matches(/^\+998\d{9}$/, { message: 'Phone must be a valid Uzbekistan number' })
  phone: string;

  @ApiProperty()
  @Field()
  @IsEmail()
  email: string;

  @ApiProperty()
  @Field()
  @MinLength(6)
  password: string;

  @ApiProperty()
  @Field()
  @MinLength(6)
  confirmPassword: string;

  @ApiProperty({ enum: UserRole, required: false })
  @Field(() => UserRole, { nullable: true })
  @IsOptional()
  @IsEnum(UserRole)
  role?: UserRole;

  @ApiProperty({ enum: UserRegion, required: false })
  @Field(() => UserRegion, { nullable: true })
  @IsOptional()
  @IsEnum(UserRegion)
  region?: UserRegion;

  @ApiProperty({ enum: UserLang, required: false })
  @Field(() => UserLang, { nullable: true })
  @IsOptional()
  @IsEnum(UserLang)
  lang?: UserLang;
}
