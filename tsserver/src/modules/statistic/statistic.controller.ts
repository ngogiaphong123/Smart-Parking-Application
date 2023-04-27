import { Request, Response } from "express";
import { numLogsInDayService, slotPieChartService } from "./statistic.service";
import { HttpStatusCode } from "axios";
import ResponseBody from "../../utils/responseBody";
import { DateInput, DayInput } from "./statistic.schema";

export const slotPieChartController = async (req : Request, res : Response) => {
    const slotPieChart = await slotPieChartService();
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get slot pie chart successfully", slotPieChart))
}
export const numLogsInDayController = async (req : Request<{},{},DayInput>, res : Response) => {
    const {day} = req.body;
    const dayDate = new Date(day);
    const result = await numLogsInDayService({day: dayDate});
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get number of logs in day successfully", result))
}