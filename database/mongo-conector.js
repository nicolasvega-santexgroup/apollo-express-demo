import { MongoClient } from 'mongodb';
import { nodeEnv } from '../lib/util';
import mongoConfig from '../config/mongo';

const mConfig = mongoConfig[nodeEnv];

module.exports = async () => {
  const db = await MongoClient.connect(mConfig.url);
  return { games: db.collection('games') };
}