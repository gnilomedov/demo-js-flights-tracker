const request = require('supertest');

process.env.PORT = 0; // Let the OS choose an available port for testing
const { app, server } = require('../../src/server');

/**
 * Test Suite: Flight Path API
 *
 * This suite tests the `/calculate` endpoint of the Flight Path API. It covers various scenarios, including:
 * - Calculating the flight path for a simple route.
 * - Handling cases where the provided flight paths are disconnected and do not form a valid route.
 * - Handling an empty flight list.
 *
 * The server is started before the tests run and stopped after all tests have completed.
 */
describe('Flight Path API', () => {
  // Ensure the server is closed after all tests are complete
  afterAll((done) => {
    server.close(done);
  });

  it('calculates the correct flight path for a simple route', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({
        flights: [['SFO', 'EWR']]
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual({
      flightPath: ['SFO', 'EWR']
    });
  });

  it('returns 400 for a disconnected flight path', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({
        flights: [
          ['SFO', 'ATL'],
          ['JFK', 'EWR']
        ]
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('No valid flight path exists');
  });

  it('handles an empty flight list', async () => {
    const response = await request(app)
      .post('/calculate')
      .send({
        flights: []
      });

    expect(response.status).toBe(400);
    expect(response.body).toHaveProperty('error');
    expect(response.body.error).toContain('No valid flight path');
  });
});
