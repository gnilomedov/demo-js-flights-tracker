const request = require('supertest');

describe('Flight Path API', () => {
  afterAll((done) => {
    server.close(done); // Close the server and call `done` when complete
  });

  it.skip('calculates correct flight path for a simple route', async () => {
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
});
