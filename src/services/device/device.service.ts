import { Request, Response } from 'express';
import { prisma } from '../../Prisma';
import logger from '../../utils/logger';

interface middlewareRequest extends Request {
  user?: string;
}

export class DeviceService {
  static async createDevice(req: middlewareRequest, res: Response) {
    try {
      const { name, type } = req.body;
      const userId = Number(req.user);

      const device = await prisma.device.create({
        data: {
          name,
          type,
          userId,
        },
      });

      logger.info(`Device created: ${name} for user ${userId}`);
      return res.status(201).json({ message: 'Device created', data: device });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      logger.error(`CreateDevice error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }

  static async getDevicesForUser(req: middlewareRequest, res: Response) {
    try {
      const userId = Number(req.user);

      const devices = await prisma.device.findMany({
        where: { userId },
        orderBy: { createdAt: 'desc' },
      });

      return res.status(200).json({ devices });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      logger.error(`GetDevicesForUser error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }
}
