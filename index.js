import express from 'express';
import cors from 'cors';
import graphqlHTTP from 'express-graphql';
import { graphiqlExpress } from 'graphql-server-express';
import http from 'http';
import { SubscriptionServer } from 'subscriptions-transport-ws';
import { execute, subscribe } from 'graphql';
import { MongoClient } from 'mongodb';
import assert from 'assert';

import { nodeEnv } from './lib/util';
import mongoConfig from './config/mongo';
import executableSchema from './api/schema';


const mConfig = mongoConfig[nodeEnv];

MongoClient.connect(mConfig.url, (err, db) => {
	assert.equal(err, null);

	const PORT = 4000;
	const app = express();

	app.use(cors());

	app.use('/graphql', graphqlHTTP({
		schema: executableSchema,
		graphiql: true,
		context: { db }
	}));

	app.use('/graphiql', graphiqlExpress({
		endpointURL: '/graphql',
		subscriptionsEndpoint: `ws://localhost:${PORT}/subscriptions`
	}));

	const server = http.createServer(app);

	server.listen(PORT, err => {
		if (err) throw err
		new SubscriptionServer(
			{
				schema: executableSchema,
				execute,
				subscribe,
				onConnect: () => console.log('Client connected'),
				onDisconnect: () => console.log('Client disconnected')
			},
			{
				server,
				path: '/subscriptions'
			}
		);
		console.log('listening...');
		console.log(`🚀 Server ready at http://localhost:${PORT}/graphql`);
		console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}/subscriptions`);

	});
});


