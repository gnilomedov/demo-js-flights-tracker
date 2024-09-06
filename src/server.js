const express = require('express'); // Express framework for building APIs
const dotenv = require('dotenv');   // dotenv for loading environment variables
const calculateRoutes = require('./routes/calculate'); // Import route handling logic for '/calculate' endpoint

// Load environment variables from the .env file
dotenv.config();

// Initialize Express app and set port from environment variables (default to 8080 if not defined)
const app = express();
const port = process.env.PORT || 8080;

// Middleware to parse incoming JSON requests
app.use(express.json());

// Setup route handling for the '/calculate' endpoint
app.use('/calculate', calculateRoutes);

// Start the server and listen on the specified port
const server = app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

// Export the app and server instance for testing purposes
module.exports = { app, server };
