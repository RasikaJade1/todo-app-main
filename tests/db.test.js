const mongoose = require('mongoose');
const connectDB = require('../config/db');

mongoose.set('strictQuery', true); // Suppress deprecation warning

// Mock environment for tests
jest.setTimeout(10000); // Increase timeout for MongoDB connections

describe('Database Connection', () => {
  beforeAll(async () => {
    // Ensure no existing connections
    await mongoose.connection.close();
  });

  afterEach(async () => {
    // Close connections after each test
    await mongoose.connection.close();
  });

  afterAll(async () => {
    // Final cleanup
    await mongoose.disconnect();
  });

  it('should connect to MongoDB successfully', async () => {
    process.env.MONGO_URI = 'mongodb://127.0.0.1:27017/testdb';
    // Start MongoDB manually if not running (for local testing)
    try {
      await connectDB();
      expect(mongoose.connection.readyState).toBe(1); // Connected
    } catch (err) {
      console.log('MongoDB not running locally. Start with: mongod --dbpath C:\\data\\db');
      throw err;
    }
  });

  it('should handle connection failure', async () => {
    // Ensure MongoDB connection is closed
    await mongoose.connection.close();
    // Use an invalid host to trigger the expected error
    process.env.MONGO_URI = 'mongodb://invalid-host:27017/testdb';
    const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
    await expect(connectDB()).rejects.toThrowError(/getaddrinfo ENOTFOUND|Server selection timed out/);
    expect(consoleErrorSpy).toHaveBeenCalledWith('MongoDB connection error:', expect.any(Error));
    consoleErrorSpy.mockRestore();
  });
});