import 'reflect-metadata';

import * as express from 'express';
import { createConnection } from 'typeorm';
import { ApolloServer } from 'apollo-server-express';
import { buildSchema } from 'type-graphql';
import { MovieResolver } from './resolvers/MovieResolver';
import { EntrepriseResolver } from './resolvers/EntrepriseResolver';
import { EmployeResolver } from './resolvers/EmployeResolver';
import { TravailResolver } from './resolvers/TravailResolver';

(async () => {
	const app = express();

	await createConnection();

	const apolloServer = new ApolloServer({
		schema: await buildSchema({
			resolvers: [
				MovieResolver,
				EntrepriseResolver,
				EmployeResolver,
				TravailResolver,
			],
		}),
		context: ({ req, res }) => ({ req, res }),
	});

	apolloServer.applyMiddleware({ app, cors: false });

	app.listen(4000, () => {
		console.log(`Express server started at http://localhost:4000`);
	})
})();
