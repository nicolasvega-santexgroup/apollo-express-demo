import mdb from '../database/mdb';
import uuidv4 from 'uuid/v4';
import moment from 'moment';
import socket from './socket';

const resolvers = {
    Query: {
        me: () => {
            return {
                id: 1,
                name: 'Nico V'
            };
        },
        allGames: (root, args, context) => {
            return mdb(context.db).getGames();
        },
        gamesPool: (root, { me }, context) => {
            return mdb(context.db).getGamesPool(me);
        },
        myGames: (root, { me }, context) => {
            return mdb(context.db).getMyGames(me);
        },
        gamesHistory: (root, { me }, context) => {
            return mdb(context.db).getGamesHistory(me);
        }
    },
    Mutation: {
        createGame: (parent, { me }, context) => {
            const id = uuidv4();
            const game = {
                id,
                creator: me,
                status: 'new',
                createdAt: moment().format()
            };

            mdb(context.db).addGame(game);

            socket.publish(GAME_CREATED, { game });

            return game;
        },
        deleteGame: (parent, { id }, context) => {
            mdb(context.db).deleteGame(id);

            return true;
        },
        acceptGame: (parent, { id, me }, context) => {
            mdb(context.db).acceptGame(id, me);

            return true;
        }
    },
    Subscription: {
        gameCreated: {
          subscribe: () => socket.asyncIterator([GAME_CREATED]),
        },
      },
};

export default resolvers;
