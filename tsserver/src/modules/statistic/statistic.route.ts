import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { logVehicleInDayController, logVehicleInMonthController, logVehicleInWeekController, numLogsInDayController, numLogsInMonthController, numLogsInWeekController, slotPieChartController } from "./statistic.controller";
import zodMiddlewares from "../../middlewares/zodValid";
import { StartDateSchema, logVehicleSchema } from "./statistic.schema";
import { requireUser } from "../../middlewares/requireUser";

const statisticRouter = Router();

statisticRouter.get("/slotPercentage", catchAsync(slotPieChartController))
statisticRouter.post("/logPerHour", zodMiddlewares(StartDateSchema, "body"), catchAsync(numLogsInDayController))
statisticRouter.post("/logPerDay", zodMiddlewares(StartDateSchema, "body"), catchAsync(numLogsInWeekController))
statisticRouter.post("/logPerWeek", zodMiddlewares(StartDateSchema, "body"), catchAsync(numLogsInMonthController))

statisticRouter.post("/customer/logPerHour", zodMiddlewares(StartDateSchema, "body"), catchAsync(numLogsInDayController))
statisticRouter.post("/customer/logPerDay", zodMiddlewares(StartDateSchema, "body"), catchAsync(numLogsInWeekController))
statisticRouter.post("/customer/logPerWeek", zodMiddlewares(StartDateSchema, "body"), catchAsync(numLogsInMonthController))

statisticRouter.post("/customer/logVehicleDay", zodMiddlewares(logVehicleSchema, "body"), catchAsync(logVehicleInDayController))
statisticRouter.post("/customer/logVehicleWeek", zodMiddlewares(logVehicleSchema, "body"), catchAsync(logVehicleInWeekController))
statisticRouter.post("/customer/logVehicleMonth", zodMiddlewares(logVehicleSchema, "body"), catchAsync(logVehicleInMonthController))
export default statisticRouter;