import { prisma } from '../../Prisma';

interface CreateDevicePayload {
  name: string;
  type: string;
  userId: number;
}

export class DeviceService {
  static async createDevice({ name, type, userId }: CreateDevicePayload) {
    const device = await prisma.device.create({
      data: { name, type, userId },
    });

    return device;
  }

  static async getDevicesForUser(userId: number) {
    const devices = await prisma.device.findMany({
      where: { userId },
      orderBy: { createdAt: 'desc' },
    });

    return devices;
  }
}
