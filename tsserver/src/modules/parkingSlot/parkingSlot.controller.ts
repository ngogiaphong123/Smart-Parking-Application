import { Request, Response } from "express";
import { ParkingSlotIdInput, ParkingSlotInput } from "./parkingSlot.schema";
import {createParkingSlotService, reservedParkingSlotService } from "./parkingSlot.service";
import { StatusCodes } from "http-status-codes";
import responseBody from "../../utils/responseBody";

export const createParkingSlotController = async (req : Request<{},{},ParkingSlotInput>, res : Response) => {
    const {pricePerHour} = req.body;
    const newParkingSlot = await createParkingSlotService({pricePerHour});
    res.status(StatusCodes.CREATED).send(new responseBody("Success", "Create parking slot success",newParkingSlot));
}
export const reservedParkingSlotController = async (req : Request<{},{},{},ParkingSlotIdInput>, res : Response) => {
    const { parkingSlotId } = req.query;
    const accountId = res.locals.user.accountId;
    const result = await reservedParkingSlotService(parkingSlotId, accountId);
    res.status(StatusCodes.OK).send(new responseBody("Success", "Reserved parking slot success",result));
}