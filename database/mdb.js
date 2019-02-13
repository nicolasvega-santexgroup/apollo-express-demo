module.exports = mPool => {
  return {
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
              { $or: [{ status: 'new' }, { status: 'accepted' }, { status: 'in progress' }] }
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
    addGame(game) {
      try {
        mPool.collection('games').insertOne(game);
      } catch (e) {
        print(e);
      }

    },
    deleteGame(id) {
      try {
        mPool.collection('games').deleteOne({ 'id': id });
      } catch (e) {
        print(e);
      }
    },
    acceptGame(id, me) {
      try {
        mPool.collection('games').updateOne(
          { 'id': id },
          { $set: { 'status': me, 'opponent': me } }
        );
      } catch (e) {
        print(e);
      }
    }
  };
};