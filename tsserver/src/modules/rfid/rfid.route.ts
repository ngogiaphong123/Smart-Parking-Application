import { Router } from "express";
import { requireAdmin } from "../../middlewares/requireUser";
import catchAsync from "../../utils/catchAsync";
import { registerRfidController } from "./rfid.controller";

const rfidRouter = Router();

rfidRouter.post("/register", requireAdmin, catchAsync(registerRfidController))

export default rfidRouter;