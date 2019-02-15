import { cellStatus } from '../lib/constants';

module.exports = mPool => {
  return {
    //users
    getUserById(id) {
      return mPool.collection('users').findOne({ id });
    },

    //games
    getGames() {
      return mPool.collection('games')
        .find().toArray();
    },
    getGamesPool(me) {
      return mPool.collection('games')
        .find({
          $and: [{ 'creator.id': { $not: { $eq: me } } }, { status: 'new' }]
        })
        .toArray();
    },
    getMyGames(me) {
      return mPool.collection('games')
        .find({
          $and:
            [
              { $or: [{ 'creator.id': me }, { 'opponent.id': me }] },
              { $or: [{ status: 'new' }, { status: 'in progress' }] }
            ]
        })
        .toArray();
    },
    getGamesHistory(me) {
      return mPool.collection('games')
        .find({
          $and:
            [
              { $or: [{ 'creator.id': me }, { 'opponent.id': me }] },
              { status: 'finished' }
            ]
        })
        .toArray();
    },
    getGameById(id) {
      return mPool.collection('games').findOne({ id });
    },
    addGame(game) {
      try {
        return mPool.collection('games').insertOne(game);
      } catch (e) {
        console.log(e);
      }

    },
    deleteGame(id) {
      try {
        mPool.collection('games').deleteOne({ 'id': id });
      } catch (e) {
        console.log(e);
      }
    },
    joinGame(id, me, board1, board2) {
      try {
        me.board = board2;
        mPool.collection('games').updateOne(
          { 'id': id },
          {
            $set: {
              'status': 'in progress',
              'creator.board': board1,
              'opponent': me,
              'turnId': me.id
            }
          }
        );
      } catch (e) {
        console.log(e);
      }
    },
    shoot(gameId, userId, x, y) {
      return mPool.collection('games')
        .findOne({ 'id': gameId })
        .then(game => {
          // if (userId === game.turnId){
          var board = [[]];
          if (game.creator.id === userId) {
            board = game.creator.board;
          } else {
            board = game.opponent.board;
          }

          if (board[x][y] > cellStatus.WATER) {
            board[x][y] = cellStatus.HITTED;
          } else if (board[x][y] === cellStatus.WATER) {
            board[x][y] = cellStatus.MISS;
          }

          if (game.creator.id === userId) {
            mPool.collection('games').updateOne(
              { 'id': gameId },
              {
                $set: {
                  'creator.board': board,
                }
              }
            )
          } else {
            mPool.collection('games').updateOne(
              { 'id': gameId },
              {
                $set: {
                  'opponent.board': board,
                }
              }
            )
          } 
          
          return board;
        });
    }
  };
};