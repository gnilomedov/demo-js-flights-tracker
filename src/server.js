const express = require('express'); // Express framework for building APIs
const dotenv = require('dotenv');   // dotenv for loading environment variables
const calculateRoutes = require('./routes/calculate'); // Import the route handling logic for '/calculate' endpoint

// Load environment variables from .env file
dotenv.config();

// Initialize Express app and set port from environment variables (default to 8080 if not defined)
const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse incoming requests with JSON payloads
app.use(express.json());

// Route setup: all requests to '/calculate' will be handled by 'calculateRoutes'
app.use('/calculate', calculateRoutes);

// Start the server and listen on the specified port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`); // Log to the console when the server starts
});

// Export the app object for use in other parts of the application, such as tests
module.exports = app;
