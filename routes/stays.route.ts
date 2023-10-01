import { StaysController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { StaysValidation } from "../validations";
import upload from "../middlewares/multer";
import auth from "../middlewares/auth";
const router = Router();

router.get("/", StaysController.get);
router.post(
  "/",
  auth("stays-create"),

  validate(StaysValidation.create, ["tiers"]),
  StaysController.create
);
router.delete(
  "/:id",
  auth("stays-delete"),

  StaysController.deleteDocument
);
router.put(
  "/:id",
  auth("stays-update"),
  validate(StaysValidation.update, ["tiers"]),

  StaysController.update
);

router.put(
  "/agent/:id",
  auth("stays-review"),
  validate(StaysValidation.agentUpdate),
  StaysController.agentUpdate
);
router.get("/single/:id", StaysController.getSingle);

router.put(
  "/comment/:id",
  auth("event-update"),
  validate(StaysValidation.comment),
  StaysController.comment
);

export default router;
