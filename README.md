# NodeJS Redis GeoLocation Demo
Author: Rheza Satria

## Requirements:
NVM v0.31.1
NodeJS v6.9.1
Redis 3.2.x


## Instructions
1. Make sure Redis server is up & running
2. You can do testing and coverage in this package
3. API
	a. `/` -> main route
	b. `/api/v1/drivers`
		Headers:
			- `USER_ID`, (Required) must be a number
		Parameters:
			- `latitude`, (Required) +/- 90
			- `longitude`, (Required) +/- 180
			- `radius`, (Optional) 500 m
			- `limit`, (Optional) 10
4. I also use CircleCI for testing automation.


## Development Environment
1. Create `.env` file, see the example in `.env.sample`
2. Fill with your own setup. For example, specify `PORT`, `REDIS`, etc


## Available Command:
1. `npm run dev` => Development
2. `npm run prod` => Production
3. `npm run test` / `npm test` => Testing
4. `npm run lint` => for linting
5. `npm run lint:fix` => for automatically fixing all linting issues

## Deployment with Docker Compose
Requirement, `boot2docker` or `docker`
1. `npm install`
2. Make sure you edit `docker-compose.yml` and change `REDIS_HOST` to your ipaddress. 
3. `docker-compose up` to run everything


## Test and Coverage:
Make sure you have followed `Instructions` part. Do the following:
1. `npm install`
2. `npm test`


## Unit Testing Coverage and Benchmark Results:
The benchmark is performed by generating random lat and long within certain radius.
You can see it in `tests/integration/test-simultaneous-drivers-api.js`. Load testing benchmark is fully satisfied with the requirements 20 concurrent requests under 100ms server response (*without network overhead to user implied*).

## Code Style and Linter
This project uses linter via `standard` instead of individual linter via `eslint` which troubled in setup.
