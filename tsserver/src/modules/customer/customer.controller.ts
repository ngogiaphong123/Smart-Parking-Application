import { Request, Response } from "express";
import { getCustomerService, getCustomersService } from "./customer.service";
import { StatusCodes } from "http-status-codes";
import { GetCustomersInput } from "./customer.schema";
import ResponseBody from "../../utils/responseBody";

export const getCustomersController = async (req: Request<{},{},GetCustomersInput>, res: Response) => {
    const customers = await getCustomersService(req.body);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get customers successfully", customers));
}

export const getCustomerByIdController = async (req: Request, res: Response) => {
    const accountId = res.locals.user.accountId;
    const customer = await getCustomerService(accountId);
    if (!customer) {
        return res.status(StatusCodes.NOT_FOUND).send(new ResponseBody("Error", "Customer not found", null));
    }
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get customer successfully", customer));
}