import { MongoClient, Db } from 'mongodb';

if (!process.env.MONGO_URI) {
  throw new Error('MONGO_URI must be set in .env.local');
}

const uri = process.env.MONGO_URI;
const options = {};

let client: MongoClient;
let mongoPromise: Promise<MongoClient>;

if (process.env.NODE_ENV === 'development') {
  let globalWithMongo = global as typeof globalThis & {
    _mongoClientPromise?: Promise<MongoClient>;
  };

  if (!globalWithMongo._mongoClientPromise) {
    client = new MongoClient(uri, options);
    globalWithMongo._mongoClientPromise = client.connect();
  }
  mongoPromise = globalWithMongo._mongoClientPromise;
} else {
  client = new MongoClient(uri, options);
  mongoPromise = client.connect();
}

export async function getDatabase(): Promise<Db> {
  const client = await mongoPromise;
  return client.db('shorturls');
}
