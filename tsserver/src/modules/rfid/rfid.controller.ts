import { Request, Response } from "express";
import { rfidListInput } from "./rfid.schema";
import { registerRfidService } from "./rfid.service";
import { StatusCodes } from "http-status-codes";

export const registerRfidController = async (req: Request<{},{},rfidListInput>, res: Response) => {
    const { list } = req.body;
    const result = list.map(async (rfid) => {
        const newRfid = await registerRfidService(rfid);
        return newRfid;
    })
    res.status(StatusCodes.OK).send(result);
}