import { Request, Response } from "express";
import { RegisterVehicleInput } from "./vehicle.schema";

export const registerVehicleController = async (req: Request<{},{},RegisterVehicleInput>, res: Response) => {
    const {genre, model, numberPlate} = req.body;
    const accountId = res.locals.user.accountId;
    
}