import { Field, InputType } from "type-graphql";

@InputType()
export class EntrepriseInput {
    @Field()
	design: string;

	@Field()
	adresse: string;
}