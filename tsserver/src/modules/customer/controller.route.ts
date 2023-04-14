import { Router } from "express";
import { requireAdmin, requireUser } from "../../middlewares/requireUser";
import zodMiddlewares from "../../middlewares/zodValid";
import { getCustomersSchema } from "./controller.schema";
import { getCustomerByIdController, getCustomersController } from "./customer.controller";
import catchAsync from "../../utils/catchAsync";

const customerRouter = Router();

customerRouter.get('/',requireAdmin, zodMiddlewares(getCustomersSchema,"body"),catchAsync(getCustomersController))
customerRouter.get('/me', requireUser, catchAsync(getCustomerByIdController))

export default customerRouter