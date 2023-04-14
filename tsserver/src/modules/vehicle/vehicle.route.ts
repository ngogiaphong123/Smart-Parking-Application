import { Router } from "express";
import catchAsync from "../../utils/catchAsync";
import { requireCustomer } from "../../middlewares/requireUser";
import { registerVehicleController } from "./vehicle.controller";
import zodMiddlewares from "../../middlewares/zodValid";
import { registerVehicleSchema } from "./vehicle.schema";

const vehicleRouter = Router();

vehicleRouter.post("/register",requireCustomer,zodMiddlewares(registerVehicleSchema,"body"),catchAsync(registerVehicleController))

export default vehicleRouter;