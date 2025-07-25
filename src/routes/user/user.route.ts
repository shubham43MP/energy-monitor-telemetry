import express from 'express';
import { UserController } from '../../controllers/user/user.controller';
import { validateBody } from '../../middlewares/validatejoi.middleware';
import { userSignupSchema } from '../../utils/validation/user.schema';

const userRouter = express.Router();

userRouter.post(
  '/user/create',
  validateBody(userSignupSchema),
  UserController.userSignupController
);

export default userRouter;
