import { Router } from "express";
import { requireAdmin, requireUser } from "../../middlewares/requireUser";
import zodMiddlewares from "../../middlewares/zodValid";
import {GetLogsDateSchema, GetLogsSchema } from "./log.schema";
import catchAsync from "../../utils/catchAsync";
import { getLogsController, getLogsCustomerDateController, getLogsDateController, getMyLogsController } from "./log.controller";

const logRouter = Router();

logRouter.post('/', requireAdmin, zodMiddlewares(GetLogsSchema,"body"),catchAsync(getLogsController))
logRouter.post('/me', requireUser, zodMiddlewares(GetLogsSchema, "body"),catchAsync(getMyLogsController))
logRouter.post('/date', requireAdmin, zodMiddlewares(GetLogsDateSchema,"body"), catchAsync(getLogsDateController))
logRouter.post('/customerDate', requireUser, zodMiddlewares(GetLogsDateSchema,"body"), catchAsync(getLogsCustomerDateController))
export default logRouter;