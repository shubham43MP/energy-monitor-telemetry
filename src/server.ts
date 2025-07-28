import app from './app';
import logger from './utils/logger';
import { PORT } from './utils/constants';
import { prisma } from './Prisma';

const portInUse = PORT || 3001;

async function startServer() {
  try {
    await prisma.$connect();
    logger.info('✅ Prisma connected to Docker Postgres');

    app.listen(PORT, () => {
      logger.info(`🟢 Server running at ${portInUse}`);
    });
  } catch (err) {
    logger.error('❌ Failed to connect to DB via Prisma: ' + err);
    process.exit(1);
  }
}

startServer();
