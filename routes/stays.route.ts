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
  auth("stays-update"),
  upload.fields([{ name: "image", maxCount: 1 }]),

  validate(StaysValidation.create),
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
  upload.fields([{ name: "image", maxCount: 1 }]),
  validate(StaysValidation.update),

  StaysController.update
);

router.put(
  "/agent/:id",
  auth("stays-review"),
  validate(StaysValidation.agentUpdate),
  StaysController.agentUpdate
);
router.get("/single/:id", StaysController.getSingle);

export default router;
