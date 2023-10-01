import { EventController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { EventValidation } from "../validations";

import auth from "../middlewares/auth";
import upload from "../middlewares/multer";
const router = Router();

router.get("/", EventController.get);
router.post(
  "/",
  auth("event-create"),

  validate(EventValidation.create, ["faqs"]),
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

  validate(EventValidation.update, ["faqs"]),
  EventController.update
);
router.get("/single/:id", EventController.getSingle);

router.put(
  "/agent/:id",
  auth("event-review"),
  validate(EventValidation.agentUpdate),
  EventController.agentUpdate
);

router.put(
  "/comment/:id",
  auth("event-update"),
  validate(EventValidation.comment),
  EventController.comment
);

export default router;
