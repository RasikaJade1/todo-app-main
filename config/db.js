// const mongoose = require('mongoose');

// module.exports = async () => {
//   try {
//     mongoose.set('debug', true); // Enable debug logging
//     await mongoose.connect(process.env.MONGO_URI, {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 30000,
//       connectTimeoutMS: 30000,
//       socketTimeoutMS: 45000,
//     });
//     console.log('MongoDB connected successfully');
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     throw err; // Throw error to be caught in app.js
//   }
// };
// const mongoose = require('mongoose');

// const connectDB = async () => {
//   try {
//     mongoose.set('strictQuery', false); // Suppress strictQuery warning
//     await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testdb', {
//       useNewUrlParser: true,
//       useUnifiedTopology: true,
//       serverSelectionTimeoutMS: 5000,
//       connectTimeoutMS: 30000,
//       socketTimeoutMS: 45000,
//     });
//     if (process.env.NODE_ENV !== 'test') {
//       console.log('MongoDB connected successfully');
//     }
//   } catch (err) {
//     console.error('MongoDB connection error:', err);
//     process.exit(1);
//   }
// };

// module.exports = connectDB;

const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/testdb', {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 5000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    mongoose.set('strictQuery', true);
    if (process.env.NODE_ENV !== 'test') {
      console.log('MongoDB connected successfully');
    }
  } catch (err) {
    console.error('MongoDB connection error:', err);
    if (process.env.NODE_ENV !== 'test') {
      process.exit(1); // Exit only in non-test environments
    }
    throw err; // Throw error for tests
  }
};

module.exports = connectDB;