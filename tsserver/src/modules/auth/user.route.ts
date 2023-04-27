import express from 'express';
import multer from 'multer'
import { storage } from '../../cloudinary/cloudinary';
import { processRequestBody } from 'zod-express-middleware';
import { requireUser } from '../../middlewares/requireUser';
import catchAsync from '../../utils/catchAsync';
import { getUserController, getUserInfoController, loginController, logoutController, registerController } from './user.controller';
import { loginUserSchema, registerUserSchema } from './user.schema';
import zodMiddlewares from '../../middlewares/zodValid';
const upload = multer({ storage })
const userRouter = express.Router();

userRouter.post('/register',upload.single('avatar'),zodMiddlewares(registerUserSchema,"body"),catchAsync(registerController));
userRouter.post('/login',zodMiddlewares(loginUserSchema,"body"),catchAsync(loginController));
userRouter.get('/me',requireUser,catchAsync(getUserController))
userRouter.get('/info', requireUser, catchAsync(getUserInfoController))
userRouter.get('/logout',requireUser,catchAsync(logoutController));
export default userRouter;  