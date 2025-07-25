import { Response } from 'express';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';
import { prisma } from '../../Prisma';
import logger from '../../utils/logger';
import { key } from '../../utils/constants';

interface SigninInput {
  email: string;
  password: string;
}

export class AuthService {
  static async signinService(data: SigninInput, res: Response) {
    try {
      const { email, password } = data;

      const user = await prisma.user.findUnique({ where: { email } });

      if (!user) {
        logger.warn(`Signin failed: User not found (${email})`);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const isValid = await bcrypt.compare(password, user.password);

      if (!isValid) {
        logger.warn(`Signin failed: Invalid password for ${email}`);
        return res.status(400).json({ message: 'Invalid credentials' });
      }

      const token = jwt.sign({ userId: user.id, email }, key, {
        expiresIn: '1d',
      });

      logger.info(`User logged in: ${user.id} (${email})`);
      return res.status(200).json({
        message: 'User logged in successfully!',
        token,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      logger.error(`Signin service error: ${message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
