import { Router } from "express";
import { requireAdmin, requireCustomer, requireUser } from "../../middlewares/requireUser";
import catchAsync from "../../utils/catchAsync";
import { createParkingSlotController, getParkingSlotByIdController } from "./parkingSlot.controller";
import zodMiddlewares from "../../middlewares/zodValid";
import { registerParkingSlotSchema } from "./parkingSlot.schema";

const parkingSlotRouter = Router();

parkingSlotRouter.post("/create", requireAdmin,zodMiddlewares(registerParkingSlotSchema,"body"), catchAsync(createParkingSlotController));
parkingSlotRouter.get('/', requireUser, catchAsync(getParkingSlotByIdController));
export default parkingSlotRouter;