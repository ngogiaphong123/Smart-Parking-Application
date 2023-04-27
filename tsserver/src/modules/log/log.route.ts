import { Router } from "express";
import { requireAdmin, requireUser } from "../../middlewares/requireUser";
import zodMiddlewares from "../../middlewares/zodValid";
import {GetLogsDateSchema, GetLogsSchema } from "./log.schema";
import catchAsync from "../../utils/catchAsync";
import { getLogsController, getLogsDateController, getMyLogsController } from "./log.controller";

const logRouter = Router();

logRouter.get('/', requireAdmin, zodMiddlewares(GetLogsSchema,"body"),catchAsync(getLogsController))
logRouter.get('/me', requireUser, catchAsync(getMyLogsController))
logRouter.get('/date', requireAdmin, zodMiddlewares(GetLogsDateSchema,"body"), catchAsync(getLogsDateController))
export default logRouter;