import express from 'express';
import cors from 'cors';
import logger from './utils/logger';
import { Request, Response, NextFunction } from 'express';
import healthRouter from './routes/health.route';
import userRouter from './routes/user/user.route'

const app = express();

app.use(cors());
app.use(express.json());


app.use((req, _res, next) => {
  logger.info(`${req.method} ${req.originalUrl}`);
  next();
});


app.use('/api/v1', healthRouter);
app.use('/api/v1/users',userRouter)

app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  logger.error(err.stack || err.message);
  res.status(500).json({ message: 'Something went wrong' });
});

export default app;
