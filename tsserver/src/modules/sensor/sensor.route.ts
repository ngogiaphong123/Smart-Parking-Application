import { Router } from "express";
import { getTemperatureController } from "./sensor.controller";
import catchAsync from "../../utils/catchAsync";

const sensorRouter = Router();

sensorRouter.get("/temperature",catchAsync(getTemperatureController))

export default sensorRouter;