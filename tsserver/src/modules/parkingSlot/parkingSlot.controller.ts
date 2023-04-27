import { Request, Response } from "express";
import { ParkingSlotIdInput, ParkingSlotInput } from "./parkingSlot.schema";
import {createParkingSlotService, getParkingSlotByIdService } from "./parkingSlot.service";
import { StatusCodes } from "http-status-codes";
import ResponseBody from "../../utils/responseBody";

export const createParkingSlotController = async (req : Request<{},{},ParkingSlotInput>, res : Response) => {
    const {pricePerHour} = req.body;
    const newParkingSlot = await createParkingSlotService({pricePerHour});
    res.status(StatusCodes.CREATED).send(newParkingSlot);
}
export const getParkingSlotByIdController = async (req : Request<{},{},{},ParkingSlotIdInput>, res : Response) => {
    const {parkingSlotId} = req.query;
    const parkingSlot = await getParkingSlotByIdService(parkingSlotId);
    res.status(StatusCodes.OK).send(parkingSlot);
}