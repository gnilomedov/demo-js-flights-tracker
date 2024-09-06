const express = require('express'); // Import Express to create a router
const router = express.Router();    // Create an Express router instance
const flightPathService = require('../services/flightPathService'); // Import flight path calculation service

// Define a POST route for calculating flight paths
router.post('/', (req, res) => {
  const { flights } = req.body;  // Extract 'flights' array from the request body

  // Validate input: Ensure 'flights' is provided and is an array
  if (!flights || !Array.isArray(flights)) {
    return res.status(400).json({ error: 'Invalid input. Expected an array of flights.' });
  }

  try {
    // Call flightPathService
    const flightPath = flightPathService.calculateFlightPath(flights);

    // Send the calculated flight path as the response in JSON format
    res.json({ flightPath });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Export the router to be used in the main server file
module.exports = router;
