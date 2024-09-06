const { buildFlightGraph, findEulerianPath } = require('../../../src/utils/flightPathUtils');

describe('Flight Path Utils', () => {
  /**
   * Test Suite: buildFlightGraph
   *
   * This suite tests the `buildFlightGraph` function from the Flight Path Utils.
   * The function constructs a graph represented as an adjacency list from a list of flights.
   */
  describe('buildFlightGraph', () => {
    test('builds correct graph from a list of flights', () => {
      const flights = [
        ['SFO', 'ATL'],
        ['ATL', 'GSO'],
        ['GSO', 'IND'],
        ['IND', 'EWR']
      ];
      const expectedGraph = {
        'SFO': ['ATL'],
        'ATL': ['GSO'],
        'GSO': ['IND'],
        'IND': ['EWR'],
        'EWR': []
      };
      expect(buildFlightGraph(flights)).toEqual(expectedGraph);
    });

    test('handles multiple flights from the same airport', () => {
      const flights = [
        ['SFO', 'ATL'],
        ['SFO', 'JFK'],
        ['ATL', 'EWR']
      ];
      const expectedGraph = {
        'SFO': ['ATL', 'JFK'],
        'ATL': ['EWR'],
        'JFK': [],
        'EWR': []
      };
      expect(buildFlightGraph(flights)).toEqual(expectedGraph);
    });

    test('handles an empty flight list', () => {
      expect(buildFlightGraph([])).toEqual({});
    });
  });

  /**
   * Test Suite: findEulerianPath
   *
   * This suite tests the `findEulerianPath` function from the Flight Path Utils.
   * The function attempts to find an Eulerian path in the graph, which is a path that visits every edge exactly once.
   */
  describe('findEulerianPath', () => {
    test('finds the correct path for a simple route', () => {
      const graph = {
        'SFO': ['ATL'],
        'ATL': ['EWR']
      };
      expect(findEulerianPath(graph)).toEqual(['SFO', 'ATL', 'EWR']);
    });

    test('finds the correct path for a complex route', () => {
      const graph = {
        'SFO': ['ATL'],
        'ATL': ['GSO'],
        'GSO': ['IND'],
        'IND': ['EWR']
      };
      expect(findEulerianPath(graph)).toEqual(['SFO', 'ATL', 'GSO', 'IND', 'EWR']);
    });

    test('handles multiple visits to the same airport', () => {
      const graph = {
        'SFO': ['ATL'],
        'ATL': ['GSO', 'JFK'],
        'JFK': ['ATL'],
        'GSO': ['EWR']
      };
      const path = findEulerianPath(graph);
      expect(path[0]).toBe('SFO');
      expect(path[path.length - 1]).toBe('EWR');
      expect(path).toContain('ATL');
      expect(path).toContain('JFK');
      expect(path).toContain('GSO');
    });

    test('returns null for a disconnected graph', () => {
      const graph = {
        'SFO': ['ATL'],
        'JFK': ['EWR']
      };
      expect(findEulerianPath(graph)).toBeNull();
    });

    test('returns null for a graph with no Eulerian path', () => {
      const graph = {
        'SFO': ['ATL', 'JFK'],
        'ATL': ['EWR']
      };
      expect(findEulerianPath(graph)).toBeNull();
    });

    test('handles a cyclic graph', () => {
      const graph = {
        'SFO': ['ATL'],
        'ATL': ['JFK'],
        'JFK': ['SFO']
      };
      const path = findEulerianPath(graph);
      expect(path.length).toBe(4);
      expect(path[0]).toBe(path[path.length - 1]);
    });

    test('handles an empty graph', () => {
      const graph = {};
      expect(findEulerianPath(graph)).toBeNull();
    });
  });
});
