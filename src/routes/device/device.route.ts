import express from 'express';
import { DeviceController } from '../../controllers/device/device.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { validateBody } from '../../middlewares/validatejoi.middleware';
import { createDeviceSchema } from '../../utils/validation/device.schema';
import { responseHandler } from '../../utils/responseHandler';

const deviceRouter = express.Router();

deviceRouter.post(
  '/device/create',
  AuthMiddleware.authMiddleware,
  validateBody(createDeviceSchema),
  responseHandler(DeviceController.createDeviceController)
);

deviceRouter.get(
  '/devices',
  AuthMiddleware.authMiddleware,
  responseHandler(DeviceController.getUserDevicesController)
);

export default deviceRouter;
