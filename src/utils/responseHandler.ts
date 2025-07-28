import { Request, Response, NextFunction } from 'express';

export const responseHandler = (
  fn: (req: Request, res: Response, next: NextFunction) => Promise<unknown>
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      const data = await fn(req, res, next);
      res.locals.data = data;
      next();
    } catch (err) {
      next(err);
    }
  };
};
