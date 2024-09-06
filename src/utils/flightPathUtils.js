/**
 * Builds a graph from a list of flights.
 *
 * Constructs a directed graph where each node represents an airport, and each edge represents a flight from one airport to another.
 *
 * @param {Array<Array<string>>} flights - An array of flight pairs, where each pair represents a flight from one airport to another.
 * @returns {Object} - An adjacency list representation of the graph, where each key is an airport and its value is an array of destinations.
 */
function buildFlightGraph(flights) {
  const graph = {};

  for (const [from, to] of flights) {
    // Initialize the adjacency list for the source and destination airports
    if (!graph[from]) graph[from] = [];
    if (!graph[to]) graph[to] = [];
    // Add the destination to the adjacency list of the source airport
    graph[from].push(to);
  }

  return graph;
}

/**
 * Finds an Eulerian path in the given graph.
 *
 * Uses Hierholzer's algorithm to find an Eulerian path, if one exists. An Eulerian path visits every edge exactly once.
 *
 * @param {Object} graph - An adjacency list representation of the graph where each key is an airport and its value is an array of destinations.
 * @returns {Array<string>|null} - An array representing the Eulerian path, or null if no valid path exists.
 */
function findEulerianPath(graph) {
  if (Object.keys(graph).length === 0) {
    return null; // Empty graph, no valid path exists
  }

  // Ensure every destination is represented in the graph
  const nodes = Object.keys(graph);
  for (const node of nodes) {
    for (const dest of graph[node]) {
      if (!(dest in graph)) {
        graph[dest] = [];
      }
    }
  }

  const path = [];
  const stack = [];
  const start = findStartNode(graph);

  if (start === null) {
    return null; // No valid path exists
  }

  stack.push(start);

  while (stack.length > 0) {
    const node = stack[stack.length - 1];

    if (!graph[node] || graph[node].length === 0) {
      path.push(node);
      stack.pop();
    } else {
      const next = graph[node].pop();
      stack.push(next);
    }
  }

  path.reverse();

  // Check if all edges were used
  for (const node in graph) {
    if (graph[node].length > 0) {
      return null; // Not all edges were used, no valid Eulerian path
    }
  }

  return path;
}

/**
 * Finds a suitable start node for the Eulerian path in the graph.
 *
 * Determines the start node based on the degrees of nodes. An Eulerian path requires exactly zero or two nodes with odd degrees.
 *
 * @param {Object} graph - An adjacency list representation of the graph where each key is an airport and its value is an array of destinations.
 * @returns {string|null} - The start node for the Eulerian path, or null if no valid start node exists.
 */
function findStartNode(graph) {
  let startNode = null;
  let endNode = null;
  let startDegree = 0;
  let endDegree = 0;

  for (const node in graph) {
    const degree = graph[node].length - (countIncomingEdges(graph, node) || 0);
    if (degree === 1) {
      startNode = node;
      startDegree++;
    } else if (degree === -1) {
      endNode = node;
      endDegree++;
    } else if (degree !== 0) {
      return null; // Graph is not Eulerian
    }
  }

  if (startDegree === 0 && endDegree === 0) {
    return Object.keys(graph)[0]; // Any node can be start in a cycle
  } else if (startDegree === 1 && endDegree === 1) {
    return startNode;
  }

  return null; // No valid start node found
}

/**
 * Counts the number of incoming edges to a given node.
 *
 * Counts how many times a given node appears as a destination in the graph.
 *
 * @param {Object} graph - An adjacency list representation of the graph where each key is an airport and its value is an array of destinations.
 * @param {string} node - The node for which to count incoming edges.
 * @returns {number} - The number of incoming edges to the given node.
 */
function countIncomingEdges(graph, node) {
  let count = 0;

  for (const from in graph) {
    if (graph[from].includes(node)) {
      count++;
    }
  }

  return count;
}

module.exports = {
  buildFlightGraph,
  findEulerianPath,
};
