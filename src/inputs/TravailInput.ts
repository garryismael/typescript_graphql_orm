import { Field, InputType, Int, Float } from 'type-graphql';

@InputType()
export class TravailInput {
	@Field(() => Int)
	nbHeures: number;

	@Field(() => Float)
	tauxHoraire: number;
}

@InputType()
export class TravailIds {
	@Field(() => Int)
	numEmploye: number;

	@Field(() => Int)
	numEntreprise: number;
}
