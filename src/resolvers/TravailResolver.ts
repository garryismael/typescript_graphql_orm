import { Arg, Mutation, Query, Resolver } from 'type-graphql';
import { Travail } from '../entity/travail';
import { TravailIds, TravailInput } from '../inputs/TravailInput';

@Resolver()
export class TravailResolver {
	@Mutation(() => Boolean)
	async updateTravail(
		@Arg('ids', () => TravailIds) ids: TravailIds,
		@Arg('travail', () => TravailInput) travailInput: TravailInput
	) {
		let travail: Travail = await this.findTravail(ids);
		return (await Travail.update(travail, travailInput)).affected > 0;
	}

	@Mutation(() => Boolean)
	async deleteTravail(@Arg('ids', () => TravailIds) ids: TravailIds) {
		let travail: Travail = await this.findTravail(ids);
		return (await Travail.delete(travail)).affected > 0;
	}

	@Query(() => [Travail])
	async travails() {
		return await Travail.find({ relations: ['employe', 'entreprise'] });
	}

	@Query(() => Travail)
	async travail(@Arg('ids', () => TravailIds) ids: TravailIds) {
		return await this.findTravail(ids);
	}

	async findTravail(ids: TravailIds): Promise<Travail> {
		return await Travail.findOneOrFail({
			relations: ['employe', 'entreprise'],
			where: {
				employe: ids.numEmploye,
				entreprise: ids.numEntreprise,
			},
		});
	}
}
