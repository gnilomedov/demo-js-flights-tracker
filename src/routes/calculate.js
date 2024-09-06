const express = require('express'); // Import Express to create a router
const router = express.Router();    // Create an Express router instance
const flightPathService = require('../services/flightPathService'); // Import flight path calculation service

/**
 * POST / - Calculate flight path based on provided flights.
 *
 * Expects an array of flights in the request body. Each flight is defined
 * by a source and destination airport code.
 */
router.post('/', (req, res) => {
  const { flights } = req.body;  // Extract 'flights' array from the request body

  // Validate input: Ensure 'flights' is provided and is an array
  if (!flights || !Array.isArray(flights)) {
    return res.status(400).json({ error: 'Invalid input. Expected an array of flights.' });
  }

  try {
    // Calculate the flight path using the service
    const flightPath = flightPathService.calculateFlightPath(flights);

    // Send the calculated flight path as the response in JSON format
    res.json({ flightPath });
  } catch (error) {
    // Handle any errors that occur during calculation
    res.status(400).json({ error: error.message });
  }
});

// Export the router to be used in the main server file
module.exports = router;
