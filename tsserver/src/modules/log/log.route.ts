import { Router } from "express";
import { requireAdmin, requireUser } from "../../middlewares/requireUser";
import zodMiddlewares from "../../middlewares/zodValid";
import { GetLogsSchema } from "./log.schema";
import catchAsync from "../../utils/catchAsync";
import { getLogsController, getMyLogsController } from "./log.controller";

const logRouter = Router();


logRouter.get('/', requireAdmin, zodMiddlewares(GetLogsSchema,"body"),catchAsync(getLogsController))
logRouter.get('/me', requireUser, catchAsync(getMyLogsController))

export default logRouter;