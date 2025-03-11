## Description

Nestjs Fastify Module Scaffolding build using Nestjs, Fastify, RabbitMQ, Redis, and MongoDB

## Installation

# 1. Configure Redis & RabbitMQ in .env.local

⚠️ Important:
RabbitMQ is not run via Docker Compose.
Please make sure you have installed and are running RabbitMQ manually before starting the application.
Update the RabbitMQ configuration in the .env file according to your RabbitMQ host, port, username, and password.

# 2. Run with Docker Compose
$ docker-compose up --build

# 3. Access the application at http://localhost:3351

## Admin Credentials:
username: admin@hni.co.id
password: admin1234


## Test

```bash
# unit tests
$ npm run test
```

## Documentation
DFD: See docs/dfd.md

## License

Nest is [MIT licensed](LICENSE).
