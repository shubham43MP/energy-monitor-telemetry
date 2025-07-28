# Use Node.js v22
FROM node:22

# Enable pnpm via Corepack
RUN corepack enable && corepack prepare pnpm@latest --activate

# Set working directory inside container
WORKDIR /app

# Copy dependency files first for caching
COPY package.json pnpm-lock.yaml ./

# Install dependencies
RUN pnpm install --frozen-lockfile

# Copy the rest of the source code
COPY . .

# Generate Prisma Client (only client, no migrate here)
RUN npx prisma generate

# Expose telemetry service port (match with .env PORT=3014)
EXPOSE 3014

# Use dev script at runtime (migrate will be run via docker-compose)
CMD ["pnpm", "dev"]
