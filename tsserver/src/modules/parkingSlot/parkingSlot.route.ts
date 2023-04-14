import { Router } from "express";
import { requireAdmin, requireCustomer, requireUser } from "../../middlewares/requireUser";
import catchAsync from "../../utils/catchAsync";
import { createParkingSlotController, reservedParkingSlotController } from "./parkingSlot.controller";
import zodMiddlewares from "../../middlewares/zodValid";
import { parkingSlotIdSchema, registerParkingSlotSchema } from "./parkingSlot.schema";

const parkingSlotRouter = Router();

parkingSlotRouter.post("/create", requireAdmin,zodMiddlewares(registerParkingSlotSchema,"body"), catchAsync(createParkingSlotController));
parkingSlotRouter.post("/reserve", requireCustomer, zodMiddlewares(parkingSlotIdSchema,"query"), catchAsync(reservedParkingSlotController));
export default parkingSlotRouter;