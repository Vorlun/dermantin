import { InputType, PartialType } from "@nestjs/graphql";
import { CreateAdvertisementInput } from "./create-advertisement.input";

@InputType()
export class UpdateAdvertisementInput extends PartialType(
  CreateAdvertisementInput,
) {}
