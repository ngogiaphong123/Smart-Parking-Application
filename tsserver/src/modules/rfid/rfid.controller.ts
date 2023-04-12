import { Request, Response } from "express";
import { rfidListInput } from "./rfid.schema";
import { registerRfidService } from "./rfid.service";
import { StatusCodes } from "http-status-codes";
import responseBody from "../../utils/responseBody";

export const registerRfidController = async (req: Request<{},{},rfidListInput>, res: Response) => {
    const { list } = req.body;
    const result = list.map(async (rfid) => {
        const newRfid = await registerRfidService(rfid);
        return newRfid;
    })
    res.status(StatusCodes.OK).send(new responseBody("Success", "Register RFID success", result));
}