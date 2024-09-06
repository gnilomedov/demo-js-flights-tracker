describe('Flight Path Service', () => {
  test.skip('calculates correct flight path for a simple route', () => {
    const flights = [['SFO', 'EWR']];
    expect(calculateFlightPath(flights)).toEqual(['SFO', 'EWR']);
  });
});
