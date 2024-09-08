# Flight Path Tracker Microservice

This microservice API helps track and calculate a person's flight path based on a list of flights, defined by source and destination airport codes.

## Project Structure

```
demo-js-flights-tracker/
├── src/
│   ├── server.js
│   ├── routes/
│   │   └── flightRoutes.js
│   ├── controllers/
│   │   └── flightController.js
│   ├── services/
│   │   └── flightPathService.js
│   └── utils/
│       └── flightPathUtils.js
├── tests/
│   ├── integration/
│   │   └── flightRoutes.test.js
│   └── unit/
│       ├── controllers/
│       │   └── flightController.test.js
│       ├── services/
│       │   └── flightPathService.test.js
│       └── utils/
│           └── flightPathUtils.test.js
├── package.json
└── README.md
```

## Technology Stack

- **Node.js**
- **Express.js**
- **Jest** (for testing)
- **npm** (for package management and scripts)

## Getting Started

1. Clone the repository:
   ```sh
   git clone https://github.com/gnilomedov/demo-js-flights-tracker
   ```
2. Install dependencies:
   ```sh
   npm install
   ```
3. Run tests:
   ```sh
   npm test
   ```
4. Start the server:
   ```sh
   npm start
   ```

## API Endpoint

The microservice exposes a single endpoint:

- **URL**: `/calculate`
- **Method**: `POST`
- **Content-Type**: `application/json`

### Request Body

```json
{
  "flights": [
    ["ATL", "EWR"],
    ["SFO", "ATL"]
  ]
}
```

### Response

```json
{
  "flightPath": ["SFO", "EWR"]
}
```

### Test the API with cURL

```sh
curl -X POST http://localhost:8080/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "flights": [
      ["IND", "EWR"],
      ["SFO", "ATL"],
      ["GSO", "IND"],
      ["ATL", "GSO"]
    ]
  }'
```

## Time Spent

- **Total Time Spent**: Approximately 7 hours (including breaks for lunch and gym)

### Breakdown:
- **Microservice Setup**: 1.5 hours
  - Set up the basic project structure and Express server.
  - Configured dotenv for environment variables and set up initial routes.

- **Algorithm Implementation**: 1.5 hours
  - Implemented the `buildFlightGraph` and `findEulerianPath` functions.
  - Developed the `calculateFlightPath` service.

- **Unit Tests**: 1.5 hours
  - Wrote unit tests for `flightPathService` and `flightPathUtils`.
  - Ensured coverage for all critical functions.

- **Integration Tests**: 1 hour
  - Developed integration tests for the `/calculate` API endpoint.
  - Validated API responses and error handling.

- **TDD Resources Used**:
  - Official documentation for Express.js and Jest.
  - Online tutorials for TDD best practices.

- **Additional Time**: 0.5 hours
  - Reviewed and refined code.
  - Addressed edge cases and minor issues.

## Interesting Ideas

- **User Accounts and Authentication**
  - **Description**: Implement secure user accounts and authentication mechanisms.
  - **Why**: Enhances security and allows for personalized user experiences.
  - **Priority**: Highest

- **Caching for Frequently Requested Flight Paths**
  - **Description**: Cache popular or recently requested flight paths to improve performance.
  - **Why**: Reduces response time and server load for frequently accessed data.
  - **Priority**: High

- **Rate Limiting and Quotas**
  - **Description**: Implement rate limits and usage quotas for API consumers.
  - **Why**: Prevents abuse, manages system load, and ensures fair access.
  - **Priority**: Medium

- **Enhanced Error Handling and User Feedback**
  - **Description**: Develop detailed error messages and user-friendly feedback mechanisms.
  - **Why**: Improves user experience by providing clear information on issues.
  - **Priority**: Medium

- **Logging and Monitoring**
  - **Description**: Set up comprehensive logging and monitoring for system performance and errors.
  - **Why**: Aids in troubleshooting, performance analysis, and ensures system reliability.
  - **Priority**: Lower
