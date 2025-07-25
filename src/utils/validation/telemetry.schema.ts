import Joi from 'joi';

export const createTelemetrySchema = Joi.object({
  entries: Joi.array()
    .items(
      Joi.object({
        deviceId: Joi.number().required(),
        timestamp: Joi.date().iso().required(),
        energyWatts: Joi.number().required(),
      })
    )
    .min(1)
    .required(),
});

export const deviceIdParamSchema = Joi.object({
  deviceId: Joi.string().required(),
});

export const usageByDaysSchema = Joi.object({
  days: Joi.number().integer().min(1).max(30).required(),
});
