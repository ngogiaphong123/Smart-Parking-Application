import { Router } from "express";
import { requireAdmin, requireCustomer, requireUser } from "../../middlewares/requireUser";
import catchAsync from "../../utils/catchAsync";
import { createParkingSlotController, reservedParkingSlotController } from "./parkingSlot.controller";

const parkingSlotRouter = Router();

parkingSlotRouter.post("/create", requireAdmin, catchAsync(createParkingSlotController));
parkingSlotRouter.post("/reserve", requireCustomer, catchAsync(reservedParkingSlotController));
export default parkingSlotRouter;