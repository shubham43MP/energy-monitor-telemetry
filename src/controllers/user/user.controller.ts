import { Request, Response } from 'express';
import { UserService } from '../../services/user/user.service';

export class UserController {
  static async userSignupController(req: Request, res: Response) {
    try {
     await  UserService.userSignupService(req, res);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      return res.status(400).json({ error: message });
    }
  }
}
