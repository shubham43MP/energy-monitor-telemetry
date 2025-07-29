# 📡 Telemetry Service

This is the **Telemetry** microservice for the Smart Home Energy Monitoring system.

---

## 📦 Environment Setup

1. Copy the example environment file:

```bash
cp .env.example .env
```

2. Then update the `.env` file with your actual values:

```env
PORT=3014
JWT_SECRET=mysecretkey
DATABASE_URL=postgresql://postgres:mypassword@localhost:5434/telemetry
```

> 🐳 If using Docker Compose, replace `localhost` with the database container name (e.g. `telemetry_postgres`):
>
> ```env
> DATABASE_URL=postgresql://postgres:mypassword@telemetry_postgres:5432/telemetry
> ```

---

## 🧪 Local Development

Make sure you have [`pnpm`](https://pnpm.io/installation) installed. Then run:

```bash
pnpm install
pnpm dev
```

---

## 🐳 Docker Deployment

### Dockerfile Build & Run (standalone)

```bash
docker build -t telemetry-service .
docker run -p 3014:3014 --env-file .env telemetry-service
```

> ✅ Ensure the database defined in your `.env` is already running and accessible.

---

### Docker Compose (service + Postgres)

If you want to run both the service and its database using Docker Compose:

```bash
docker compose up --build
```

> Make sure to replace `localhost` in the `.env` `DATABASE_URL` with `telemetry_postgres`.

---

## ✅ Health Check

You can test if the service is running with:

```bash
curl http://localhost:3014/api/health
```

---

## 🔁 Notes

- Requires **PostgreSQL**.
- Uses **JWT** for authentication.
- Exposes port **3014**.
