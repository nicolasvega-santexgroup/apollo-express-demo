import { makeExecutableSchema } from 'graphql-tools';
import resolvers from './resolvers';

const typeDefs = [`
    type User {
        id: ID!
        name: String
    }
    type Player {
        id: ID!
        name: String
        board: [[Int]]
    }
    type Game {
        id: ID!
        status: String
        creator: Player
        opponent: Player
        createdAt: String
    }
    type Shoot {
        gameId: ID!
        board: [[Int]]
    }
    type Query {
        me(id: ID!): User
        allGames: [Game]
        gamesPool(userId: ID!): [Game]
        myGames(userId: ID!): [Game]
        gamesHistory(userId: ID!): [Game]
        game(id: ID!): Game
    }
    input UserInput {
        id: ID!
        name: String
    }
    type Mutation {
        createGame(userId: ID!, username: String!): Game!
        deleteGame(id: ID!): Boolean!
        joinGame(id: ID!, userId: ID!, username: String!): Boolean!
        shoot(gameId: ID!, userId: ID!, x: Int!, y: Int!): Int!
        surrend(gameId: ID!, userId: ID!): Boolean!
    }
    type Subscription {
        gameCreated: Game
        newShoot: Shoot
    }
`];

const options = {
    typeDefs,
    resolvers,
};

const executableSchema = makeExecutableSchema(options);
export default executableSchema;
export { typeDefs };