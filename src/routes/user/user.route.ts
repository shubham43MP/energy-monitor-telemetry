import express from 'express';
import { UserController } from '../../controllers/user/user.controller';

const userRouter = express.Router();

userRouter.post('/', UserController.userSignupController); // ✅ root path

export default userRouter;
