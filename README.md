# Flight Path Tracker Microservice

This microservice API helps track and calculate a person's flight path based on a list of flights, defined by source and destination airport codes.

## Project Structure

```
volumefi-takehome-gnilomedov-20240906/
├── src/
│   ├── server.js
│   ├── routes/
│   │   └── calculate.js
│   ├── services/
│   │   └── flightPathService.js
├── tests/
│   ├── services/
│   │   └── flightPathService.test.js
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
   git clone https://github.com/gnilomedov/volumefi-takehome-gnilomedov-20240906
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

TODO
[Developer to fill in the time spent on the project]

## Interesting Ideas

TODO
[Developer to share any interesting ideas or challenges faced during development]
