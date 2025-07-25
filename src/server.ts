import app from './app';
import logger from './utils/logger';
import { PORT } from './utils/constants';

const portInUse = PORT || 3001;

app.listen(PORT, () => {
  logger.info(`🟢 Server running at ${portInUse}`);
});
