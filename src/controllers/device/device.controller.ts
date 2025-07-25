import { Request, Response } from 'express';
import { DeviceService } from '../../services/device/device.service';
import logger from '../../utils/logger';

export class DeviceController {
  static async createDeviceController(req: Request, res: Response) {
    try {
      await DeviceService.createDevice(req, res);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      logger.error(`createDeviceController error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }

  static async getUserDevicesController(req: Request, res: Response) {
    try {
      await DeviceService.getDevicesForUser(req, res);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      logger.error(`getUserDevicesController error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }
}
