import { BlogController } from "../controllers";

import { Router } from "express";
import validate from "../middlewares/validate";
import { StaysValidation } from "../validations";
import upload from "../middlewares/multer";
import auth from "../middlewares/auth";
const router = Router();

router.get("/", BlogController.get);
router.post(
  "/",
  auth("stays-update"),
  upload.fields([{ name: "image", maxCount: 1 }]),

  validate(StaysValidation.create),
  BlogController.create
);
router.delete(
  "/:id",
  auth("stays-delete"),

  BlogController.deleteDocument
);
router.put(
  "/:id",
  auth("stays-update"),
  upload.fields([{ name: "image", maxCount: 1 }]),
  validate(StaysValidation.update),

  BlogController.update
);
router.get("/single/:id", BlogController.getSingle);

export default router;
