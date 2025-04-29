// const express = require('express');
// const mongoose = require('mongoose');
// const dotenv = require('dotenv');
// const taskRoutes = require('./routes/tasks');

// dotenv.config();

// const app = express();
// const PORT = process.env.PORT || 3000;

// // Middleware
// app.use(express.urlencoded({ extended: true }));
// app.use(express.static('public'));
// app.set('view engine', 'ejs');

// // Database connection
// const connectDB = require('./config/db');

// // Start server only after DB connection
// async function startServer() {
//   try {
//     await connectDB();
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   } catch (err) {
//     console.error('Failed to start server:', err);
//     process.exit(1);
//   }
// }

// startServer();

// // Routes
// app.use('/', taskRoutes);

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const taskRoutes = require('./routes/tasks');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

// Database connection
const connectDB = require('./config/db');

// Routes
app.use('/', taskRoutes);

// Start server only if this file is run directly
if (require.main === module) {
  async function startServer() {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
      });
    } catch (err) {
      console.error('Failed to start server:', err);
      process.exit(1);
    }
  }
  startServer();
}

// Export app for testing
module.exports = app;