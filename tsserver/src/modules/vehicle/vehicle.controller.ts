import { Request, Response } from "express";
import { RegisterVehicleInput } from "./vehicle.schema";
import { createVehicleService } from "./vehicle.service";
import { StatusCodes } from "http-status-codes";
import responseBody from "../../utils/responseBody";

export const registerVehicleController = async (req: Request<{},{},RegisterVehicleInput>, res: Response) => {
    const {genre, model, numberPlate} = req.body;
    const accountId = res.locals.user.accountId;
    const vehicle = await createVehicleService({genre, model, numberPlate}, accountId);
    if(!vehicle) {
        return res.status(StatusCodes.BAD_REQUEST).send(new responseBody("Error", "Vehicle already exists or RFID car is full", null));
    }
    res.status(StatusCodes.CREATED).send(new responseBody("Success", "Vehicle created", vehicle));
}