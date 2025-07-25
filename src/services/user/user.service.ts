import { Response } from 'express';
import bcrypt from 'bcryptjs';
import { prisma } from '../../Prisma';
import logger from '../../utils/logger';

interface SignupInput {
  username: string;
  email: string;
  password: string;
}

export class UserService {
  static async userSignupService(userData: SignupInput, res: Response) {
    try {
      const { username, email, password } = userData;

      const existingUser = await prisma.user.findUnique({
        where: { email },
      });

      if (existingUser) {
        logger.warn(`Signup failed: Email already exists - ${email}`);
        return res.status(400).json({ error: 'Email already in use!' });
      }

      const hashedPassword = await bcrypt.hash(password, 10);

      const user = await prisma.user.create({
        data: {
          username,
          email,
          password: hashedPassword,
        },
      });

      logger.info(`User created: ${user.id} (${email})`);

      return res.status(201).json({
        message: 'User created successfully!',
        userId: user.id,
      });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      logger.error(`Signup service error: ${message}`);
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}
