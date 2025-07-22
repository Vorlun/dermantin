import { Field, InputType, Int } from "@nestjs/graphql";
import { ApiProperty } from "@nestjs/swagger";
import { IsInt } from "class-validator";

@InputType()
export class CreateHistoryInput {
    @ApiProperty()
    @Field(()=>Int)
    @IsInt()
    userId: number

    @ApiProperty()
    @Field(()=>Int)
    @IsInt()
    dermantinId:number
}
