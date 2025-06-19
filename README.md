# Microservice Architecture with NestJS, gRPC, Redis, PostgreSQL, RabbitMQ, and WebSocket

This repository demonstrates a microservice architecture using [NestJS](https://nestjs.com/), [gRPC](https://grpc.io/), [PostgreSQL](https://www.postgresql.org/), [Redis](https://redis.io/), [RabbitMQ](https://www.rabbitmq.com/), [WebSocket](https://docs.nestjs.com/websockets/gateways), and [Docker Compose](https://docs.docker.com/compose/). It includes services for user management, authentication, tasks, products, projects, notifications, and an API gateway.

---

## Features

- **NestJS** for scalable, modular backend services
- **gRPC** for efficient inter-service communication
- **RabbitMQ** for message-based microservice communication (e.g., notifications)
- **WebSocket** for real-time updates (e.g., notifications, live task status)
- **PostgreSQL** as the main database
- **Redis** for caching (via `cache-manager-ioredis`)
- **Docker Compose** for local orchestration
- **Nx** for monorepo management
- **Proto files** for contract-first service definitions

---

## Project Structure

```
apps/
  api-gateway/
  auth/
  notification/      # Uses RabbitMQ and WebSocket
  products/
  projects/
  tasks/
  userManagement/
libs/
  common/
  shared-entities/
  ...
proto/
types/
```

---

## Prerequisites

- [Node.js](https://nodejs.org/) (v18+ recommended)
- [Docker](https://www.docker.com/products/docker-desktop)
- [Nx CLI](https://nx.dev/) (optional, for local dev)

---

## Getting Started

### 1. Clone the repository

```sh
git clone https://github.com/ShifarEmtiuz07/Dynamic-Project-Management-Tool-using-Microservice.git
cd Dynamic-Project-Management-Tool-using-Microservice
```

### 2. Install dependencies

```sh
npm install
```

### 3. Set up environment variables

Copy `.env.example` to `.env` and adjust as needed:

```sh
cp .env.example .env
```

### 4. Start all services with Docker Compose

```sh
docker-compose up --build -d
```

This will start:
- PostgreSQL (port 5433)
- Redis (port 6379)
- RabbitMQ (port 5672, management UI at 15672)
- pgAdmin (port 5050)
- All NestJS microservices
- API Gateway (port 3000)
- task-service (port 5003)
- notification-service (port 3000)
- usermanagement-service (port 5002)
- projects-service (port 5001)
- products-service (port 5000)
- auth-service (port 5004)

### 5. Accessing Services

- **API Gateway:** http://localhost:3000/api
- **pgAdmin:** http://localhost:5050 (login with credentials from `.env`)
- **RabbitMQ Management:** http://localhost:15672 (default user/pass: guest/guest)
- **WebSocket:** ws://localhost:PORT (see your notification or gateway service for the port)
- **Other services:** See `docker-compose.yml` for ports

---

## Messaging & Real-Time

- **RabbitMQ** is used for asynchronous messaging between services (e.g., task events, notifications).
- **WebSocket** is used for real-time updates to clients (e.g., push notifications, live task status).
- See the `notification` service for RabbitMQ and WebSocket integration examples.

---

## Caching

- Uses `cache-manager-ioredis` for Redis-backed caching.
- Configuration is in each service’s module (see `RedisCacheModule`).

---

## gRPC

- Proto files are in the `proto/` directory.
- Types are generated in the `types/` directory.

---

## Auth Service

The **Auth Service** is responsible for:

- **Authentication:**  
  Handles user login and registration using JWT (JSON Web Tokens). Upon successful login, the service issues access and refresh tokens. Tokens are signed with a secret defined in your `.env` file (`JWT_SECRET`).

- **Authorization:**  
  Verifies JWT tokens on protected routes. The API Gateway and other services use guards to validate tokens and extract user information from requests.

- **Role-Based Access Control (RBAC):**  
  Supports role-based permissions using custom decorators and guards. You can annotate controllers or routes with roles (e.g., `@Roles('admin')`) and protect them with the `RolesGuard` and `AuthGuard`. Only users with the required roles can access certain endpoints.

---

## Troubleshooting

- **Docker build errors:** Ensure your Docker build context is set to the monorepo root (`.`) in `docker-compose.yml`.
- **Redis/DB/RabbitMQ connection issues:** Check your `.env` and Docker Compose service names.
- **TypeScript errors for cache-manager-ioredis:** Add a `cache-manager-ioredis.d.ts` file with `declare module 'cache-manager-ioredis';`.

---

## License

MIT

---

## Credits

- [NestJS](https://nestjs.com/)
- [Nx](https://nx.dev/)
- [cache-manager-ioredis](https://www.npmjs.com/package/cache-manager-ioredis)
- [RabbitMQ](https://www.rabbitmq.com/)
- [Docker](https://www.docker.com/)