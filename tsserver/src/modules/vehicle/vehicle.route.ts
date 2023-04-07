import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { requireCustomer } from "../../middlewares/requireUser";
import { registerVehicleController } from "./vehicle.controller";

const vehicleRouter = Router();

vehicleRouter.post("/register",requireCustomer,catchAsync(registerVehicleController))

export default vehicleRouter;