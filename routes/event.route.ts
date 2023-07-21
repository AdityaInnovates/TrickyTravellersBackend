import { EventController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { EventValidation } from "../validations";
import upload from "../middlewares/multer";
import auth from "../middlewares/auth";
const router = Router();

router.get("/", EventController.get);
router.post(
  "/",
  auth("evenet-update"),

  validate(EventValidation.create),
  EventController.create
);
router.delete(
  "/:id",
  auth("evenet-delete"),

  EventController.deleteDocument
);
router.put(
  "/:id",
  auth("evenet-update"),
  validate(EventValidation.update),
  EventController.update
);
router.get("/single/:id", EventController.getSingle);

export default router;
