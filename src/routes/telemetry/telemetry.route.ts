import express from 'express';
import { TelemetryController } from '../../controllers/telemetry/telemetry.controller';
import { AuthMiddleware } from '../../middlewares/auth.middleware';
import { validateBody } from '../../middlewares/validatejoi.middleware';
import { responseHandler } from '../../utils/responseHandler';
import {
  createTelemetrySchema,
  deviceIdParamSchema,
  usageByDaysSchema,
} from '../../utils/validation/telemetry.schema';

const telemetryRouter = express.Router();

telemetryRouter.post(
  '/data/create',
  AuthMiddleware.authMiddleware,
  validateBody({ body: createTelemetrySchema }),
  responseHandler(TelemetryController.createTelemetryController)
);

telemetryRouter.get(
  '/device/:deviceId',
  AuthMiddleware.authMiddleware,
  validateBody({ params: deviceIdParamSchema }),
  responseHandler(TelemetryController.getDeviceTelemetryController)
);

telemetryRouter.get(
  '/usage/:deviceId',
  AuthMiddleware.authMiddleware,
  validateBody({ params: deviceIdParamSchema, query: usageByDaysSchema }),
  responseHandler(TelemetryController.getUsageByDaysController)
);

export default telemetryRouter;
