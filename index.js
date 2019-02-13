import express from 'express';
import { ApolloServer } from 'apollo-server-express';
import cors from 'cors';
import { MongoClient } from 'mongodb';
import assert from 'assert';

import { typeDefs } from './api/schema';
import resolvers from './api/resolvers';
import { nodeEnv } from './lib/util';
import mongoConfig from './config/mongo';


import http from 'http';


const mConfig = mongoConfig[nodeEnv];

// MongoClient.connect(mConfig.url, (err, db) => {
// 	assert.equal(err, null);

const PORT = 4000;
const app = express();
app.use(cors());

const server = new ApolloServer({
	typeDefs,
	resolvers,
	subscriptions: {
		onConnect: () => console.log('Connected to websocket'),
	}
	// context: {
	// 	db
	// }
});

server.applyMiddleware({ app });

const httpServer = http.createServer(app);
server.installSubscriptionHandlers(httpServer);

app.listen(PORT, () => {
	console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`)
	console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`)
});

// });




// import express from 'express';

// import { ApolloServer } from 'apollo-server-express';
// import http from 'http';
// import { typeDefs } from './schema';
// import resolvers from './resolvers';

// const PORT = 3031;
// const app = express();


// const server = new ApolloServer({
//   typeDefs,
//   resolvers,
// });

// server.applyMiddleware({
//   app
// });

// const httpServer = http.createServer(app);
// server.installSubscriptionHandlers(httpServer);

// httpServer.listen(PORT, () => {
//   console.log(`🚀 Server ready at http://localhost:${PORT}${server.graphqlPath}`);
//   console.log(`🚀 Subscriptions ready at ws://localhost:${PORT}${server.subscriptionsPath}`);
// });
