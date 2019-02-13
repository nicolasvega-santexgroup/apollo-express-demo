import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import assert from 'assert';

import typeDefs from './api/schema';
import resolvers from './api/resolvers';
import { nodeEnv } from './lib/util';
import mongoConfig from './config/mongo';

const mConfig = mongoConfig[nodeEnv];

MongoClient.connect(mConfig.url, (err, db) => {
	assert.equal(err, null);

	const app = express();

	app.use(cors());

	const PORT = 4000;

	const SERVER = new ApolloServer({
		typeDefs,
		resolvers,
		subscriptions: '/subscriptions',
		context: {
			db
		}
	});

	SERVER.applyMiddleware({ app });

	app.listen(PORT, () => {
		console.log(`🚀 Server ready at http://localhost:${PORT}${SERVER.graphqlPath}`)
		console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${SERVER.subscriptionsPath}`)
	});

});


