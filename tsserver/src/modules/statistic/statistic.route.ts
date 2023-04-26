import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { slotPieChartController } from "./statistic.controller";

const statisticRouter = Router();

statisticRouter.get("/slotPieChart", catchAsync(slotPieChartController))

export default statisticRouter;