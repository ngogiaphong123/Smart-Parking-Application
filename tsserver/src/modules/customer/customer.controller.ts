import { Request, Response } from "express";
import { getCustomerService, getCustomersService } from "./controller.service";
import { StatusCodes } from "http-status-codes";
import { GetCustomersInput } from "./controller.schema";
import ResponseBody from "../../utils/responseBody";

export const getCustomersController = async (req: Request<{},{},GetCustomersInput>, res: Response) => {
    const customers = await getCustomersService(req.body);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get customers successfully", customers));
}

export const getCustomerByIdController = async (req: Request, res: Response) => {
    const accountId = res.locals.user.accountId;
    const customer = await getCustomerService(accountId);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get customer successfully", customer));
}