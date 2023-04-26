import { Request, Response } from "express";
import { slotPieChartService } from "./statistic.service";
import { HttpStatusCode } from "axios";
import ResponseBody from "../../utils/responseBody";

export const slotPieChartController = async (req : Request, res : Response) => {
    const slotPieChart = await slotPieChartService();
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get slot pie chart successfully", slotPieChart))
}
