import { Field, InputType } from "type-graphql";

@InputType()
export class EmployeInput {
    @Field()
	nom: string;

	@Field()
	adresse: string;
}