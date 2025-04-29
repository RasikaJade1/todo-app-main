const mongoose = require('mongoose');
require('dotenv').config();

async function testConnection() {
  try {
    console.log('Attempting to connect to:', process.env.MONGO_URI);
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      serverSelectionTimeoutMS: 30000,
      connectTimeoutMS: 30000,
      socketTimeoutMS: 45000,
    });
    console.log('MongoDB connected successfully');
    const tasks = await mongoose.connection.db.collection('tasks').find().toArray();
    console.log('Tasks in database:', tasks);
    await mongoose.connection.close();
  } catch (err) {
    console.error('Connection error:', err);
  }
}

testConnection();