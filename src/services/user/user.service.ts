import { Request, Response } from 'express';
import { prisma } from '../../Prisma';
import bcrypt from 'bcryptjs';

export class UserService {
  static async userSignupService(req: Request, res: Response){
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      res.status(400).json({
        message: 'Incomplete data. Please provide all required fields.',
      });
      return;
    }

    try {
      const ifExisting = await prisma.user.findUnique({ where: { email } });

      if (ifExisting) {
        res.status(400).json({ error: 'Email already in use!' });
        return;
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: { username, email, password: hashedPassword },
      });

      res.status(201).json({
        message: 'User created successfully!',
        userId: user.id,
      });

      return;
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      console.error('Signup error:', message);
      res.status(500).json({ error: message });
      return;
    }
  }
}
