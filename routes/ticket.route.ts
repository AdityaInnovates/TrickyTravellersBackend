import { Router } from "express";
import { TicketController } from "../controllers";
import auth from "../middlewares/auth";
import validate from "../middlewares/validate";
import { EventValidation } from "../validations";

const router = Router();

router.get("/", auth("ticket"), TicketController.get);
router.post(
  "/",
  auth("ticket"),
  validate(EventValidation.ticket),
  TicketController.create
);

export default router;
