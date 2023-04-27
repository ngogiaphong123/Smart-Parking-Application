import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import ResponseBody from "../../utils/responseBody";
import { GetCustomersInput } from "./customer.schema";
import { getCustomersService } from "./customer.service";

export const getCustomersController = async (req: Request<{},{},GetCustomersInput>, res: Response) => {
    const customers = await getCustomersService(req.body);
    res.status(StatusCodes.OK).send(new ResponseBody("Success", "Get customers successfully", customers));
}
