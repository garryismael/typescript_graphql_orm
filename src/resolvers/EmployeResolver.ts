import { Arg, Int, Mutation, Query, Resolver } from 'type-graphql';
import { Employe } from '../entity/employe';
import { Entreprise } from '../entity/entreprise';
import { Travail } from '../entity/travail';
import { EmployeInput } from '../inputs/EmployeInput';
import { TravailInput } from '../inputs/TravailInput';

@Resolver()
export class EmployeResolver {
	@Mutation(() => Employe)
	async createEmploye(
		@Arg('options', () => EmployeInput) employe: EmployeInput,
		@Arg('numEntreprise', () => Int) numEntreprise: number,
		@Arg('travail', () => TravailInput) travail: TravailInput
	) {
		let newEmploye: Employe = await Employe.create(employe).save();
		let entreprise: Entreprise = await Entreprise.findOneOrFail(
			numEntreprise
		);
		await Travail.insert({
			employe: newEmploye,
			entreprise,
			nbHeures: travail.nbHeures,
			tauxHoraire: travail.tauxHoraire,
		});
		return newEmploye;
	}

	@Mutation(() => Boolean)
	async updateEmploye(
		@Arg('id', () => Int) id: number,
		@Arg('options', () => EmployeInput) employe: EmployeInput
	) {
		return (await Employe.update({ id }, employe)).affected > 0;
	}

	@Mutation(() => Boolean)
	async deleteEmploye(@Arg('id', () => Int) id: number) {
		return (await Employe.delete(id)).affected > 0;
	}

	@Query(() => [Employe])
	async employes() {
		return await Employe.find();
	}

	@Query(() => Employe)
	async findEmployeById(@Arg('id') id: number) {
		return Employe.findOne(id);
	}
}
