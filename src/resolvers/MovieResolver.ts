import { Resolver, Mutation, Arg, Int, Query } from 'type-graphql';
import { Movie } from '../entity/Movie';
import { MovieInput, MovieUpdateInput } from '../inputs/MovieInput';

@Resolver()
export class MovieResolver {
	@Mutation(() => Movie)
	async createMovie(@Arg('options', () => MovieInput) options: MovieInput) {
		return await Movie.create(options).save();
	}

	@Mutation(() => Boolean)
	async updateMovie(
		@Arg('id', () => Int) id: number,
		@Arg('input', () => MovieUpdateInput) input: MovieUpdateInput
	) {
		await Movie.update({ id }, input);
		return true;
	}

	@Mutation(() => Boolean)
	async deleteMovie(@Arg('id', () => Int) id: number) {
		await Movie.delete({ id });
		return true;
	}

	@Query(() => [Movie])
	movies() {
		return Movie.find();
	}
}
