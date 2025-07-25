import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import logger from './utils/logger';
import { Request, Response, NextFunction } from 'express';
import healthRouter from './routes/health.route';
import userRouter from './routes/user/user.route';
import authRouter from './routes/auth/auth.route';
import deviceRouter from './routes/device/device.route';
import telemetryRouter from './routes/telemetry/telemetry.route';
import { setupSwagger } from './docs/swagger';

dotenv.config();
const app = express();

setupSwagger(app);
app.use(cors());
app.use(express.json());

app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});

app.use('/api/v1', healthRouter);
app.use('/api/v1', userRouter);
app.use('/api/v1', authRouter);
app.use('/api/v1', deviceRouter);
app.use('/api/v1', telemetryRouter);

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ message: 'Something went wrong' });
});

export default app;
