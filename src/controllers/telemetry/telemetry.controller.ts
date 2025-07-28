// controllers/telemetry.controller.ts
import { Request } from 'express';
import { TelemetryService } from '../../services/telemetry/telemetry.service';

interface MiddlewareRequest extends Request {
  user?: string;
}

export class TelemetryController {
  static async createTelemetryController(req: MiddlewareRequest) {
    const { entries } = req.body;
    const userId = Number(req.user);

    const result = await TelemetryService.createTelemetry({
      entries,
      userId,
    });

    return {
      message: 'Telemetry recorded',
      ...result,
    };
  }

  static async getDeviceTelemetryController(req: MiddlewareRequest) {
    const { deviceId } = req.params;
    const userId = Number(req.user);

    const data = await TelemetryService.getDeviceTelemetry({
      deviceId,
      userId,
    });

    return { telemetry: data };
  }

  static async getUsageByDaysController(req: MiddlewareRequest) {
    const { deviceId } = req.params;
    const { days } = req.query;
    const userId = Number(req.user);

    const data = await TelemetryService.getUsageByDays({
      deviceId,
      userId,
      days: Number(days),
    });

    return { telemetry: data };
  }
}
