import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = [`
    type User {
        id: ID!
        name: String
    }
    type Game {
        id: ID!
        creator: User
        status: String
        opponent: User
        createdAt: String
    }
    type Query {
        me: User
        allGames: [Game]
        gamesPool(me: ID!): [Game]
        myGames(me: ID!): [Game]
        gamesHistory(me: ID!): [Game]
    }
    input UserInput {
        id: ID!
        name: String
    }
    type Mutation {
        createGame(me: UserInput!): Game!
        deleteGame(id: ID!): Boolean!
        acceptGame(id: ID!, me: UserInput!): Boolean!
    }
    type Subscription {
        gameCreated: Game
    }
`];

const options = {
    typeDefs,
    resolvers,
};

const executableSchema = makeExecutableSchema(options);
export default executableSchema;
export { typeDefs };