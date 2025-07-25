import Joi from 'joi';

export const createDeviceSchema = Joi.object({
  name: Joi.string().min(2).max(50).required(),
  type: Joi.string().valid('sensor', 'appliance', 'meter').required(), // adjust allowed types as needed
});
