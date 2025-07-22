import { InputType, PartialType } from "@nestjs/graphql";
import { CreateHistoryInput } from "./create-history.input";

@InputType()
export class UpdateHistoryinput extends PartialType(CreateHistoryInput) {}
