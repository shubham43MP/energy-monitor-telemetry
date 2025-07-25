import { Request, Response } from 'express';
import logger from '../../utils/logger';
import { TelemetryService } from '../../services/telemetry/telemetry.service';

interface middlewareRequest extends Request {
  user?: string;
}

export class TelemetryController {
  static async createTelemetryController(
    req: middlewareRequest,
    res: Response
  ) {
    try {
      const { entries } = req.body;
      const userId = Number(req.user);

      logger.info(`Bulk telemetry entry initiated by user: ${userId}`);
      await TelemetryService.createTelemetry({ entries, userId }, res);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      logger.error(`createTelemetryController error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }

  static async getDeviceTelemetryController(
    req: middlewareRequest,
    res: Response
  ) {
    try {
      const { deviceId } = req.params;
      const userId = Number(req.user);

      await TelemetryService.getDeviceTelemetry({ deviceId, userId }, res);
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      logger.error(`getDeviceTelemetryController error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }

  static async getUsageByDaysController(req: middlewareRequest, res: Response) {
    try {
      const { deviceId } = req.params;
      const { days } = req.query;
      const userId = Number(req.user);

      await TelemetryService.getUsageByDays(
        {
          deviceId,
          userId,
          days: Number(days),
        },
        res
      );
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unexpected error';
      logger.error(`getUsageByDaysController error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }
}
