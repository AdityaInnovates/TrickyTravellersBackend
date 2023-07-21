import { EventController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { EventValidation } from "../validations";

import auth from "../middlewares/auth";
const router = Router();

router.get("/", EventController.get);
router.post(
  "/",
  auth("event-update"),

  validate(EventValidation.create),
  EventController.create
);
router.delete(
  "/:id",
  auth("event-delete"),

  EventController.deleteDocument
);
router.put(
  "/:id",
  auth("event-update"),
  validate(EventValidation.update),
  EventController.update
);
router.get("/single/:id", EventController.getSingle);

export default router;
