# Telemetry Service

This is the **Telemetry** microservice for the Smart Home Energy Monitoring system.

## 📦 Environment Setup

1. Create a `.env` file in the root of this service.
2. Add required environment variables. Example:

```env
PORT=3014
JWT_SECRET=mysecretkey
DATABASE_URL=postgresql://postgres:mypassword@localhost:5434/telemetry
```

## 🧪 Local Development

Make sure you have `pnpm` installed. Then run:

```bash
pnpm install
pnpm dev
```

## 🐳 Docker Deployment

### Dockerfile Build & Run (standalone)

```bash
docker build -t telemetry-service .
docker run -p 3014:3014 --env-file .env telemetry-service
```

> Make sure the database defined in your `.env` is already running and accessible.

### Docker Compose (service + Postgres)

If you want to run both the service and its database using Docker Compose and make sure you replace localhost in databse uri with container name:

```bash
docker compose up --build
```

> Ensure your `docker-compose.yaml` exposes and maps the Postgres port (`5432`) to `5434` and sets `POSTGRES_DB=telemetry`.

### Example `docker-compose.yaml`

```yaml
services:
  telemetry_postgres:
    image: postgres:15
    container_name: telemetry_postgres
    restart: always
    ports:
      - '5434:5432'
    environment:
      POSTGRES_USER: postgres
      POSTGRES_PASSWORD: mypassword
      POSTGRES_DB: telemetry
    volumes:
      - telemetry_pgdata:/var/lib/postgresql/data

  telemetry_service:
    build: .
    container_name: telemetry_service
    ports:
      - '3014:3014'
    depends_on:
      - telemetry_postgres
    env_file:
      - .env

volumes:
  telemetry_pgdata:
```
