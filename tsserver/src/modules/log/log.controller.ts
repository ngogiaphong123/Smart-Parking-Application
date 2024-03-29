import { Request, Response } from "express";
import { GetLogsByDateInput, GetLogsByVehicleInput, GetLogsInput } from "./log.schema";
import { getLogsByVehicleService, getLogsCustomerDateService, getLogsDateService as getLogsDateService, getLogsService, getMyLogService } from "./log.service";
import { StatusCodes } from "http-status-codes";
import ResponseBody from "../../utils/responseBody";

export const getLogsController = async (req: Request<{},{},GetLogsInput>, res: Response) => {
    const logs = await getLogsService(req.body);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get logs successfully", logs));
}

export const getMyLogsController = async (req: Request<{},{},GetLogsInput>, res: Response) => {
    const {page, limit} = req.body;
    const accountId = res.locals.user.accountId;
    const logs = await getMyLogService(accountId,page,limit);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get logs successfully", logs));
}

export const getLogsDateController = async (req: Request<{},{}, GetLogsByDateInput>, res: Response) => {
    const {start} = req.body;
    const {end} = req.body;
    const {page, limit} = req.body;
    // convert date to timestamp
    const input = {
        start: new Date(start),
        end: new Date(end),
        page : page,
        limit : limit
    }
    const result = await getLogsDateService(input);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get logs successfully", result));
}

export const getLogsCustomerDateController = async (req: Request<{},{}, GetLogsByDateInput>, res: Response) => {
    const accountId = res.locals.user.accountId;
    const {start} = req.body;
    const {end} = req.body;
    const {page, limit} = req.body;
    // convert date to timestamp
    const input = {
        accountId : accountId,
        start: new Date(start),
        end: new Date(end),
        page : page,
        limit : limit
    }
    const result = await getLogsCustomerDateService(input);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get customers logs successfully", result));
}

export const getLogsCustomerByVehicleController = async (req: Request<{},{}, GetLogsByVehicleInput>, res: Response) => {
    const {vehicleId, page, limit} = req.body;
    const accountId = res.locals.user.accountId;
    const result = await getLogsByVehicleService({accountId, vehicleId, page, limit});
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get customers logs successfully", result));
}