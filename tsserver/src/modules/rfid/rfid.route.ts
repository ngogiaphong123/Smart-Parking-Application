import { Router } from "express";
import { requireAdmin } from "../../middlewares/requireUser";
import catchAsync from "../../utils/catchAsync";
import { registerRfidController } from "./rfid.controller";
import zodMiddlewares from "../../middlewares/zodValid";
import { rfidListSchema } from "./rfid.schema";

const rfidRouter = Router();

rfidRouter.post("/register",requireAdmin, zodMiddlewares(rfidListSchema,'body'), catchAsync(registerRfidController))

export default rfidRouter;