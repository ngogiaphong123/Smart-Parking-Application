import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { numLogsInDayController, slotPieChartController } from "./statistic.controller";
import zodMiddlewares from "../../middlewares/zodValid";
import { DaySchema } from "./statistic.schema";

const statisticRouter = Router();

statisticRouter.get("/slotPercentage", catchAsync(slotPieChartController))
statisticRouter.post("/logPerHour", zodMiddlewares(DaySchema, "body"), catchAsync(numLogsInDayController))

export default statisticRouter;