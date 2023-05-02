import { Request, Response } from "express";
import { customerPercentageService, logVehicleService, numLogsInDayService, numLogsInMonthService, numLogsInWeekService, slotPieChartService } from "./statistic.service";
import { HttpStatusCode } from "axios";
import ResponseBody from "../../utils/responseBody";
import { LogVehicleInput, StartDateInput } from "./statistic.schema";

export const slotPieChartController = async (req : Request, res : Response) => {
    const slotPieChart = await slotPieChartService();
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get slot pie chart successfully", slotPieChart))
}

export const customerPercentageController = async (req : Request, res : Response) => {
    const customerPercentage = await customerPercentageService();
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get customer percentage successfully", customerPercentage))
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

export const logVehicleInDayController = async (req : Request<{},{},LogVehicleInput>, res : Response) => {
    const startInput = req.body.start;
    const input = {
        start : new Date(startInput),
    }
    console.log(req.body.accountId, input)
    const result = await logVehicleService(input, req.body.accountId, "day");
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get pie chart of custom vehicle logs in 1 day successfully", result))
}

export const logVehicleInWeekController = async (req : Request<{},{},LogVehicleInput>, res : Response) => {
    const startInput = req.body.start;
    const input = {
        start : new Date(startInput),
    }
    const result = await logVehicleService(input, req.body.accountId, "week");
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get pie chart of custom vehicle logs in 1 week successfully", result))
}

export const logVehicleInMonthController = async (req : Request<{},{},LogVehicleInput>, res : Response) => {
    const startInput = req.body.start;
    const input = {
        start : new Date(startInput),
    }
    const result = await logVehicleService(input, req.body.accountId, "month");
    res.status(HttpStatusCode.Ok).send(new ResponseBody("Success", "Get pie chart of custom vehicle logs in 1 month successfully", result))
}