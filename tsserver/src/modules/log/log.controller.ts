import { Request, Response } from "express";
import { GetLogsInput } from "./log.schema";
import { getLogsService } from "./log.service";
import { StatusCodes } from "http-status-codes";
import ResponseBody from "../../utils/responseBody";

export const getLogsController = async (req: Request<{},{},GetLogsInput>, res: Response) => {
    const logs = await getLogsService(req.body);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get logs successfully", logs));
}

export const getMyLogsController = async (req: Request, res: Response) => {
    const accountId = res.locals.user.accountId;
    const logs = await getLogsService(accountId);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get logs successfully", logs));
}