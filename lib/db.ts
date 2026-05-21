import mongoose from 'mongoose';

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable');
}

interface MongooseConnection {
  conn: typeof mongoose | null;
  promise: Promise<typeof mongoose> | null;
}

declare global {
  var mongooseConnection: MongooseConnection | undefined;
}

if (!global.mongooseConnection) {
  global.mongooseConnection = {
    conn: null,
    promise: null,
  };
}

const cachedConnection = global.mongooseConnection as MongooseConnection;

export async function dbConnect() {
  if (cachedConnection.conn) {
    return cachedConnection.conn;
  }

  if (!cachedConnection.promise) {
    cachedConnection.promise = mongoose
      .connect(MONGODB_URI!, {
        bufferCommands: false,
      })
      .then((mongoose) => {
        return mongoose;
      });
  }

  cachedConnection.conn = await cachedConnection.promise;
  return cachedConnection.conn;
}
