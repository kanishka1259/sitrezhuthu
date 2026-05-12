// __tests__/setup/api.setup.ts
import mongoose from 'mongoose';

// Use in-memory MongoDB for API tests
beforeAll(async () => {
  const { MongoMemoryServer } = await import('mongodb-memory-server');
  const mongod = await MongoMemoryServer.create();
  const uri = mongod.getUri();
  await mongoose.connect(uri);
  (global as any).__mongod = mongod;
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
