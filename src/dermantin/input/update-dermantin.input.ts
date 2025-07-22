import { InputType, PartialType } from "@nestjs/graphql";
import { CreateDermantinInput } from "./create-dermantin.input";

@InputType()
export class UpdateDermantinInput extends PartialType(CreateDermantinInput) {}
