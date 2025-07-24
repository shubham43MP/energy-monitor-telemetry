import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../../Prisma';
import logger from '../../utils/logger';

export class AuthService {
  static async signinService(req: Request, res: Response) {
    const { email, password } = req.body;

    if (!email || !password) {
      res
        .status(400)
        .json({ message: 'Please provide mentioned credentials!' });
    }

    try {
      const ifExisitng = await prisma.user.findUnique({ where: { email } });

      if (ifExisitng) {
        const actualPassword = ifExisitng.password;

        const validUser = await bcrypt.compare(password, actualPassword);

        if (validUser) {
          const key = process.env.JWT_SECRET || '';
          const userId = ifExisitng.id;
          const token = jwt.sign({ userId, email }, key, { expiresIn: '1d' });
          return res
            .status(201)
            .json({ message: 'User logged in successfully!', token });
        }
      }
      res
        .status(400)
        .json({ message: 'please provide valid data!', ifExisitng });
    } catch (err) {
      if (err instanceof Error) {
        throw new Error(err.message);
      } else {
        throw new Error('Unknown error');
      }
    }
  }
}
