import { prisma } from '../../Prisma';

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
  static async createTelemetry({ entries, userId }: BulkPayload) {
    const deviceIds = entries.map((e) => e.deviceId);

    const userDevices = await prisma.device.findMany({
      where: { id: { in: deviceIds }, userId },
      select: { id: true },
    });

    const allowedDeviceIds = new Set(userDevices.map((d) => d.id));

    const filteredEntries = entries.filter((e) =>
      allowedDeviceIds.has(e.deviceId)
    );

    if (filteredEntries.length === 0) {
      throw new Error('No valid device IDs for this user');
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

    return { inserted: result.count };
  }

  static async getDeviceTelemetry({ deviceId, userId }: DeviceQuery) {
    const device = await prisma.device.findFirst({
      where: { id: Number(deviceId), userId },
    });

    if (!device) {
      throw new Error('Unauthorized: Device not found for user');
    }

    const data = await prisma.telemetry.findMany({
      where: { deviceId: Number(deviceId) },
      orderBy: { timestamp: 'desc' },
    });

    return data;
  }

  static async getUsageByDays({ deviceId, userId, days }: UsageQuery) {
    const device = await prisma.device.findFirst({
      where: { id: Number(deviceId), userId },
    });

    if (!device) {
      throw new Error('Unauthorized: Device not found for user');
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

    return data;
  }
}
