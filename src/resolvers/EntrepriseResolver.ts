import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Entreprise } from '../entity/entreprise';
import { EntrepriseInput } from '../inputs/EntrepriseInput';

@Resolver()
export class EntrepriseResolver {
	@Mutation(() => Entreprise)
	async createEntreprise(
		@Arg('options', () => EntrepriseInput) input: EntrepriseInput
	) {
		return await Entreprise.create(input).save();
	}

	@Mutation(() => Boolean)
	async updateEntreprise(
		@Arg('id', () => Int) id: number,
		@Arg('options', () => EntrepriseInput) input: EntrepriseInput
	) {
		return (await Entreprise.update({ id }, input)).affected > 0;
	}

	@Mutation(() => Boolean)
	async deleteEntreprise(@Arg('id', () => Int) id: number) {
		return (await Entreprise.delete({ id })).affected > 0;
	}

	@Query(() => [Entreprise])
	async entreprises() {
		return await Entreprise.find();
	}

	@Query(() => Entreprise)
	async findEntrepriseById(@Arg('id', () => Int) id: number) {
		return await Entreprise.findOne(id);
	}
}
