import { Request, Response } from "express";
import { ParkingSlotInput } from "./parkingSlot.schema";
import { createParkingSlotService } from "./parkingSlot.service";
import { StatusCodes } from "http-status-codes";

export const createParkingSlotController = async (req : Request<{},{},ParkingSlotInput>, res : Response) => {
    const {status, pricePerHour} = req.body;
    const newParkingSlot = await createParkingSlotService({status, pricePerHour});
    res.status(StatusCodes.CREATED).send(newParkingSlot);
}