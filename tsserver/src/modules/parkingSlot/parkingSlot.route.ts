import { Router } from "express";
import { requireAdmin } from "../../middlewares/requireUser";
import catchAsync from "../../utils/catchAsync";
import { createParkingSlotController } from "./parkingSlot.controller";

const parkingSlotRouter = Router();

parkingSlotRouter.post("/create", requireAdmin, catchAsync(createParkingSlotController));

export default parkingSlotRouter;