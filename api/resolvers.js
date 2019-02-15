import uuidv4 from 'uuid/v4';
import moment from 'moment';
import { PubSub } from 'apollo-server-express';

import mdb from '../database/mdb';
import {defaultGameMatrix, ships} from '../lib/constants';
import { putShipsOnCells } from '../lib/helpers';

const pubsub = new PubSub();
const resolvers = {
    Query: {
        me: (root, { id }, context) => {
            return mdb(context.db).getUserById(id);
        },
        allGames: (root, args, context) => {
            return mdb(context.db).getGames();
        },
        gamesPool: (root, { userId }, context) => {
            return mdb(context.db).getGamesPool(userId);
        },
        myGames: (root, { userId }, context) => {
            return mdb(context.db).getMyGames(userId);
        },
        gamesHistory: (root, { userId }, context) => {
            return mdb(context.db).getGamesHistory(userId);
        },
        game: (root, { id }, context) => {
            return mdb(context.db).getGameById(id);
        }
    },
    Mutation: {
        createGame: (parent, { userId, username }, context) => {
            var me = {
                id: userId,
                name: username
            }
            const id = uuidv4();
            var game = {
                id,
                creator: me,
                status: 'new',
                createdAt: moment().format()
            };

            mdb(context.db)
                .addGame(game)
                .then(response => {
                    var created = response.ops[0];
                    pubsub.publish('GAME_CREATED', { gameCreated: created });
                });

            //TODO: return result of adding
            return game;
        },
        deleteGame: (parent, { id }, context) => {
            mdb(context.db).deleteGame(id);
            //TODO:
            return true;
        },
        joinGame: (parent, { id, userId, username }, context) => {
            var board1 = putShipsOnCells(defaultGameMatrix, ships);
            var board2 = putShipsOnCells(defaultGameMatrix, ships);
            var me = {
                id: userId,
                name: username
            };

            mdb(context.db).joinGame(id, me, board1, board2);

            return true;
        },
        shoot: (parent, { gameId, userId, x, y }, context) => {
            mdb(context.db)
                .shoot(gameId, userId, x, y)
                .then(board => {
                    var newShoot = {
                        gameId,
                        board
                    };
                    pubsub.publish('NEW_SHOOT', { newShoot });
                });
            return 0;
        },
        surrend: (parent, { gameId, userId }, context) => {
            return true;
        }
    },
    Subscription: {
        gameCreated: {
            subscribe: () => pubsub.asyncIterator('GAME_CREATED')
        },
        newShoot: {
            subscribe: () => pubsub.asyncIterator('NEW_SHOOT')
        }
    },
};

export default resolvers;