const { calculateFlightPath } = require('../../../src/services/flightPathService');

/**
 * Test Suite: Flight Path Service
 *
 * This suite tests the `calculateFlightPath` function from the Flight Path Service.
 * The function calculates the start and end airports of a flight path based on a list of flights.
 */
describe('Flight Path Service', () => {
  test('calculates the correct start and end airports for a simple path', () => {
    const flights = [['SFO', 'EWR']];
    expect(calculateFlightPath(flights)).toEqual(['SFO', 'EWR']);
  });

  test('calculates the correct start and end airports for a complex path', () => {
    const flights = [
      ['ATL', 'EWR'],
      ['SFO', 'ATL']
    ];
    expect(calculateFlightPath(flights)).toEqual(['SFO', 'EWR']);
  });

  test('throws an error for an invalid flight path', () => {
    const flights = [
      ['SFO', 'ATL'],
      ['GSO', 'IND']
    ];
    expect(() => calculateFlightPath(flights)).toThrow('No valid flight path exists for the given flights.');
  });
});
