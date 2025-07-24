import { Request, Response } from 'express';
import { AuthService } from '../../services/auth/auth.service';

export class AuthController {
  static async userSigninController(req: Request, res: Response) {
    await AuthService.signinService(req, res);
  }
}
