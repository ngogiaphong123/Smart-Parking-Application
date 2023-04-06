import { NextFunction, Request, Response } from "express";
import { getTemperatureService } from "./temperature/temperature.service";
import { StatusCodes } from "http-status-codes";
import { SensorRequestQueryInput } from "./sensor.schema";

export const getTemperatureController = async (req: Request<{},{},{},SensorRequestQueryInput>, res: Response, next: NextFunction) => {
    //{{host}}/sensors/temperature?page=0&limit=10
    let {page, limit} = req.query;
    const temperature = await getTemperatureService({page, limit});
    if(!temperature) {
        return res.status(StatusCodes.BAD_REQUEST).send("Temperature not found");
    }
    res.status(StatusCodes.OK).send(temperature);
}