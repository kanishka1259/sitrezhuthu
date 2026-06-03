process.env.MONGODB_URI = 'mongodb://127.0.0.1:27017/test_dummy';
import mongoose from 'mongoose';

// Use in-memory MongoDB for API tests
beforeAll(async () => {
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  (global as any).__mongod = mongod;
  
  // Cache the connection in global so that lib/db.ts's dbConnect reuses it
  const cache = (global as any).mongooseConnection || {};
  cache.conn = mongoose;
  cache.promise = Promise.resolve(mongoose);
  (global as any).mongooseConnection = cache;
});

afterAll(async () => {
  await mongoose.connection.dropDatabase();
  await mongoose.connection.close();
  await (global as any).__mongod?.stop();
});

afterEach(async () => {
  // Clear all collections between tests for isolation
  const collections = mongoose.connection.collections;
  for (const key in collections) {
    await collections[key].deleteMany({});
  }
});
