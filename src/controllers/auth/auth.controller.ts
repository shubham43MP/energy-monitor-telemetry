import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/auth.service';
import logger from '../../utils/logger';

export class AuthController {
  static async userSigninController(req: Request, res: Response) {
    try {
      const { email, password } = req.body;

      logger.info(`Signin attempt for email: ${email}`);
      await AuthService.signinService({ email, password }, res);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      logger.error(`Signin controller error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }
}
