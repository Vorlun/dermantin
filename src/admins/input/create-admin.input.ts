import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsPhoneNumber, IsString, MinLength } from "class-validator";

@InputType()
export class CreateAdminInput {
    @Field()
    @IsString()
    full_name:string;

    @Field()
    @IsEmail()
    email:string

    @Field()
    @IsPhoneNumber()
    phone:string

    @Field()
    @MinLength(6)
    password:string


}
