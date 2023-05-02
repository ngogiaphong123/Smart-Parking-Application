import { Request, Response } from "express";
import { numLogsInDayService, numLogsInMonthService, numLogsInWeekService, slotPieChartService } from "./statistic.service";
import { HttpStatusCode } from "axios";
import ResponseBody from "../../utils/responseBody";
import { StartDateInput } from "./statistic.schema";

export const slotPieChartController = async (req : Request, res : Response) => {
    const slotPieChart = await slotPieChartService();
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get slot pie chart successfully", slotPieChart))
}
export const numLogsInDayController = async (req : Request<{},{},StartDateInput>, res : Response) => {
    if (req.body.accountId) {
        const startInput = req.body.start;
        const input = {
            start : new Date(startInput),
        }
        const result = await numLogsInDayService(input, req.body.accountId);
        res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get number of customers logs in day successfully", result))
    }
    else {
        const startInput = req.body.start;
        const input = {
            start : new Date(startInput),
        }
        const result = await numLogsInDayService(input,"");
        res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get number of logs in day successfully", result))    
    }
}
export const numLogsInWeekController = async (req : Request<{},{},StartDateInput>, res : Response) => {
    if(req.body.accountId) {
        const startInput = req.body.start;
        const input = {
            start : new Date(startInput),
        }
        const result = await numLogsInWeekService(input, req.body.accountId);
        res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get number of customers logs in week successfully", result))
    }
    else {
        const startInput = req.body.start;
        const input = {
            start : new Date(startInput),
        }
        const result = await numLogsInWeekService(input, "");
        res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get number of logs in week successfully", result))    
    }
}

export const numLogsInMonthController = async (req : Request<{},{},StartDateInput>, res : Response) => {
    if(req.body.accountId) {
        const startInput = req.body.start;
        const input = {
            start : new Date(startInput),
        }
        const result = await numLogsInMonthService(input, req.body.accountId);
        res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get number of customers logs in month successfully", result))
    }
    else {
        const startInput = req.body.start;
        const input = {
            start : new Date(startInput),
        }
        const result = await numLogsInMonthService(input,"");
        res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get number of logs in month successfully", result))
    }
}