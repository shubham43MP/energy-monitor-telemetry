import express from 'express';
import { AuthController } from '../../controllers/auth/auth.controller';

const authRouter = express.Router();

authRouter.post('/auth/signin', AuthController.userSigninController);

export default authRouter;
