import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import logger from '../utils/logger';
import { key } from '../utils/constants';

interface middlewareRequest extends Request {
  user?: string;
}

export class AuthMiddleware {
  static authMiddleware(
    req: middlewareRequest,
    res: Response,
    next: NextFunction
  ) {
    const token = req.headers['authorization']?.split(' ')[1] || '';

    try {
      const isAuthenticated = jwt.verify(token, key);

      if (typeof isAuthenticated === 'object' && 'userId' in isAuthenticated) {
        req.user = isAuthenticated.userId;
        return next();
      }

      res.status(401).json({ message: 'invalid token payload' });
      return;
    } catch (err) {
      logger.info(err);
      res.status(401).json({ error: 'unauthorized' });
    }
  }
}
