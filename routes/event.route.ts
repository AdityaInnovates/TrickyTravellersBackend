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
  upload.fields([{ name: "image", maxCount: 1 }]),
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
  upload.fields([{ name: "image", maxCount: 1 }]),
  validate(EventValidation.update),
  EventController.update
);
router.get("/single/:id", EventController.getSingle);

router.put(
  "/agent/:id",
  auth("event-review"),
  validate(EventValidation.agentUpdate),
  EventController.agentUpdate
);

export default router;
