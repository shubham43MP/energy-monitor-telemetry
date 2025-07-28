import { Response } from 'express';
import logger from './logger';

export function handleError(res: Response, err: unknown, label = 'Error') {
  const message = err instanceof Error ? err.message : 'Unexpected error';
  logger.error(`${label}: ${message}`);
  return res.status(500).json({ error: message });
}
