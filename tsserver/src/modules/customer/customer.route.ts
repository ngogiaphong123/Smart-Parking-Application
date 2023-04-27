import { Router } from "express";
import { requireAdmin, requireUser } from "../../middlewares/requireUser";
import zodMiddlewares from "../../middlewares/zodValid";
import { getCustomersSchema } from "./customer.schema";
import { getCustomersController } from "./customer.controller";
import catchAsync from "../../utils/catchAsync";

const customerRouter = Router();

customerRouter.get('/',requireAdmin, zodMiddlewares(getCustomersSchema,"body"),catchAsync(getCustomersController))

export default customerRouter