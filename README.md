# School Management System

## Modules Overview
This repository contains the enterprise-grade implementation of the School Management System.

- **Backend**: NestJS, PostgreSQL 18, Redis, RabbitMQ
- **Database ORM**: Prisma 7
- **Frontend**: To be implemented inside the `frontend/` directory

## Getting Started

### 1. Start Infrastructure
Run the following command to start PostgreSQL, Redis, RabbitMQ, and Adminer:
```bash
docker-compose up -d
```
Access Adminer at `http://localhost:8080`.

### 2. Configure Environment variables
Copy the example environment variables:
```bash
cp .env.example .env
```

### 3. Setup Backend
Install dependencies, generate the Prisma client, and start the development server:
```bash
cd backend
npm install
npx prisma generate
npx prisma db push
npm run start:dev
```

### Next Steps
The core directory structure uses Domain-Driven Design for enterprise usage. Feel free to explore `/backend/prisma/schema.prisma` for the database schema details!
