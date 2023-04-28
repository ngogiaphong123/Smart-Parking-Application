import { Router } from "express";
import { requireAdmin, requireUser } from "../../middlewares/requireUser";
import zodMiddlewares from "../../middlewares/zodValid";
import {GetLogsByDateSchema, GetLogsSchema, getLogsByVehicleSchema } from "./log.schema";
import catchAsync from "../../utils/catchAsync";
import { getLogsController, getLogsCustomerByVehicleController as getLogsByVehicleController, getLogsCustomerDateController, getLogsDateController, getMyLogsController } from "./log.controller";

const logRouter = Router();

logRouter.post('/', requireAdmin, zodMiddlewares(GetLogsSchema,"body"),catchAsync(getLogsController))
logRouter.post('/me', requireUser, zodMiddlewares(GetLogsSchema, "body"),catchAsync(getMyLogsController))
logRouter.post('/date', requireAdmin, zodMiddlewares(GetLogsByDateSchema,"body"), catchAsync(getLogsDateController))
logRouter.post('/myVehicle', requireUser, zodMiddlewares(getLogsByVehicleSchema,"body"), catchAsync(getLogsByVehicleController))
logRouter.post('/customerDate', requireUser, zodMiddlewares(GetLogsByDateSchema,"body"), catchAsync(getLogsCustomerDateController))
export default logRouter;