import { Request } from 'express';
import { DeviceService } from '../../services/device/device.service';

interface MiddlewareRequest extends Request {
  user?: string;
}

export class DeviceController {
  static async createDeviceController(req: MiddlewareRequest) {
    const { name, type } = req.body;
    const userId = Number(req.user);

    const device = await DeviceService.createDevice({ name, type, userId });

    return { message: 'Device created', data: device };
  }

  static async getUserDevicesController(req: MiddlewareRequest) {
    const userId = Number(req.user);
    const devices = await DeviceService.getDevicesForUser(userId);

    return { devices };
  }
}
