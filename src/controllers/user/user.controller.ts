import { Request, Response } from 'express';
import { UserService } from '../../services/user/user.service';
import logger from '../../utils/logger';

export class UserController {
  static async userSignupController(req: Request, res: Response) {
    try {
      const { username, email, password } = req.body;

      logger.info(`Signup attempt for email: ${email}`);
      await UserService.userSignupService({ username, email, password }, res);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      logger.error(`Signup controller error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }
}
