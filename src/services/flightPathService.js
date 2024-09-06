const { buildFlightGraph, findEulerianPath } = require('../utils/flightPathUtils');

/**
 * Calculates the flight path from a list of flights.
 *
 * This function constructs a graph from the provided list of flights and attempts to find an Eulerian path in the graph.
 * The result is an array containing the start and end airports of the flight path, or an error if no valid path exists.
 *
 * @param {Array<Array<string>>} flights - An array of flight pairs, where each pair represents a flight from one airport to another.
 * @returns {Array<string>} - An array containing the start and end airports of the flight path.
 * @throws {Error} - Throws an error if no valid flight path exists.
 */
function calculateFlightPath(flights) {
  const flightGraph = buildFlightGraph(flights);
  const path = findEulerianPath(flightGraph);

  if (!path) {
    throw new Error('No valid flight path exists for the given flights.');
  }

  return [path[0], path[path.length - 1]];
}

module.exports = {
  calculateFlightPath,
};
