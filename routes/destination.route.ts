import { DestinationController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { CategoryValidation } from "../validations";
import auth from "../middlewares/auth";
import upload from "../middlewares/multer";
const router = Router();

router.get("/", DestinationController.get);
router.post(
  "/",
  auth("destination-create"),
  upload.fields([{ name: "image", maxCount: 1 }]),
  DestinationController.create
);
router.delete("/:id", DestinationController.deleteDocument);
router.put(
  "/:id",
  auth("destination-update"),
  validate(CategoryValidation.create),
  DestinationController.update
);
router.get(
  "/single/:id",
  auth("destination-read"),
  DestinationController.getSingle
);

export default router;
