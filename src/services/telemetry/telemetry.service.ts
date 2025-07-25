import { Response } from 'express';
import { prisma } from '../../Prisma';
import logger from '../../utils/logger';

interface TelemetryEntry {
  deviceId: number;
  energyWatts: number;
  timestamp: string;
}

interface BulkPayload {
  entries: TelemetryEntry[];
  userId: number;
}

interface DeviceQuery {
  deviceId: string;
  userId: number;
}

interface UsageQuery {
  deviceId: string;
  userId: number;
  days: number;
}

export class TelemetryService {
  static async createTelemetry(
    { entries, userId }: BulkPayload,
    res: Response
  ): Promise<Response> {
    try {
      const deviceIds = entries.map((e) => e.deviceId);

      const userDevices = await prisma.device.findMany({
        where: {
          id: { in: deviceIds },
          userId,
        },
        select: { id: true },
      });

      const allowedDeviceIds = new Set(userDevices.map((d) => d.id));

      const filteredEntries = entries.filter((e) =>
        allowedDeviceIds.has(e.deviceId)
      );

      if (filteredEntries.length === 0) {
        return res
          .status(403)
          .json({ message: 'No valid device IDs for this user' });
      }

      const data = filteredEntries.map((entry) => ({
        deviceId: entry.deviceId,
        energyWatts: entry.energyWatts,
        timestamp: new Date(entry.timestamp),
      }));

      const result = await prisma.telemetry.createMany({
        data,
        skipDuplicates: true,
      });

      logger.info(`Inserted ${result.count} telemetry entries`);
      return res
        .status(201)
        .json({ message: 'Telemetry recorded', inserted: result.count });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      logger.error(`createTelemetry error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }

  static async getDeviceTelemetry(
    { deviceId, userId }: DeviceQuery,
    res: Response
  ): Promise<Response> {
    try {
      const device = await prisma.device.findFirst({
        where: { id: Number(deviceId), userId },
      });

      if (!device) {
        return res
          .status(403)
          .json({ message: 'Unauthorized: Device not found for user' });
      }

      const data = await prisma.telemetry.findMany({
        where: { deviceId: Number(deviceId) },
        orderBy: { timestamp: 'desc' },
      });

      return res.status(200).json({ telemetry: data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      logger.error(`getDeviceTelemetry error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }

  static async getUsageByDays(
    { deviceId, userId, days }: UsageQuery,
    res: Response
  ): Promise<Response> {
    try {
      const device = await prisma.device.findFirst({
        where: { id: Number(deviceId), userId },
      });

      if (!device) {
        return res
          .status(403)
          .json({ message: 'Unauthorized: Device not found for user' });
      }

      const since = new Date();
      since.setDate(since.getDate() - days);

      const data = await prisma.telemetry.findMany({
        where: {
          deviceId: Number(deviceId),
          timestamp: { gte: since },
        },
        orderBy: { timestamp: 'desc' },
      });

      return res.status(200).json({ telemetry: data });
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Unknown error';
      logger.error(`getUsageByDays error: ${message}`);
      return res.status(500).json({ error: message });
    }
  }
}
