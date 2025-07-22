import { InputType, PartialType } from "@nestjs/graphql";
import { CreateDermantinImageInput } from "./create-dermantin-image.input";

@InputType()
export class UpdateDermantinImageInput extends PartialType(
  CreateDermantinImageInput,
) {}
